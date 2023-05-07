package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.auth.JwtTokenService;
import com.multipixeltec.dcservice.dto.FaceAuthDto;
import com.multipixeltec.dcservice.dto.JWTRequest;
import com.multipixeltec.dcservice.dto.JWTResponse;
import com.multipixeltec.dcservice.dto.UpdatePasswordDto;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.User;
import com.multipixeltec.dcservice.service.PatientService;
import com.multipixeltec.dcservice.service.UserService;
import com.multipixeltec.dcservice.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-04
 * Developer : priyamal
 */
@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class AuthController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService jwtTokenService;
    private final JwtUserDetailsService userDetailsService;
    private final PatientService patientService;
    private final FileService fileService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    @Value("${application.protocol}")
    private String protocol;

    public AuthController(AuthenticationManager authenticationManager, JwtTokenService jwtTokenService, JwtUserDetailsService userDetailsService, PatientService patientService, FileService fileService, UserService userService, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenService = jwtTokenService;
        this.userDetailsService = userDetailsService;
        this.patientService = patientService;
        this.fileService = fileService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<?> login(@RequestBody JWTRequest jwtRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword()));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
        AppUserDetails userDetails = (AppUserDetails) userDetailsService.loadUserByUsername(jwtRequest.getEmail());
        String accessToken = jwtTokenService.generateToken(userDetails);
        String refreshToken = jwtTokenService.generateRefreshToken(userDetails);
        JWTResponse response = new JWTResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUser(userDetails.getUser());
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/auth/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) throws Exception {
        JWTResponse response = new JWTResponse();
        try {
            String token = jwtTokenService.getToken(request);
            String username = jwtTokenService.getUsernameFromToken(token);
            AppUserDetails userDetails = (AppUserDetails) userDetailsService.loadUserByUsername(username);
            String accessToken = jwtTokenService.generateToken(userDetails);
            response.setAccessToken(accessToken);
            response.setRefreshToken(token);
            response.setUser(userDetails.getUser());
            return ResponseEntity.ok(response);
        } catch (DisabledException e) {
            response.setError("USER_DISABLED");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (BadCredentialsException e) {
            response.setError("INVALID_CREDENTIALS");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } catch (IllegalArgumentException e) {
            response.setError("NO_AUTH_TOKEN");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }


    @GetMapping("/auth/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String token = jwtTokenService.getToken(request);
        String username = jwtTokenService.getUsernameFromToken(token);
        AppUserDetails userDetails = (AppUserDetails) userDetailsService.loadUserByUsername(username);
        return ResponseEntity.ok(userDetails.getUser());
    }

    @PostMapping(value = "/auth/face")
    public Object faceAuth(@RequestBody FaceAuthDto dto, @RequestHeader(HttpHeaders.HOST) String host){
        List<Patient> patients = patientService.findAll();
        if (dto.getFace()!=null){
            String path = fileService.saveFace("auth",dto.getFace());
            dto.setFace(path);
            for (Patient patient : patients) {
                if (patient.getPhoto()!=null && !patient.getPhoto().isEmpty()) {
                    logger.info(patient.getPhoto());
                }
            }
            return path;
        }
        return dto;
    }

    @PostMapping(value = "/auth/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDto dto){
        Optional<User> optionalUser = userService.find(dto.getId());
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
            if (passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
                userService.save(user);
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Old password didn't match!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found!");
    }

}
