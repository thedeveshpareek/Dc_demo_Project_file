package com.multipixeltec.dcservice.util;

import com.multipixeltec.dcservice.dto.LicenseResponse;
import com.multipixeltec.dcservice.enums.Permission;
import com.multipixeltec.dcservice.model.*;
import com.multipixeltec.dcservice.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.actuate.context.ShutdownEndpoint;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-24
 * Developer : priyamal
 */
@Component
public class LicenseChecker implements CommandLineRunner {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ShutdownEndpoint shutdownEndpoint;
    private final ConfigurationService configurationService;
    private final UserService userService;
    private final RoleService roleService;
    private final RolePermissionService rolePermissionService;
    private final PasswordEncoder passwordEncoder;
    private final RefValueService refValueService;
    private RestTemplate restTemplate;
    private MultiValueMap<String,String> params;

    public LicenseChecker(ShutdownEndpoint shutdownEndpoint, ConfigurationService configurationService, UserService userService, RoleService roleService, RolePermissionService rolePermissionService, PasswordEncoder passwordEncoder, RefValueService refValueService) {
        this.shutdownEndpoint = shutdownEndpoint;
        this.configurationService = configurationService;
        this.userService = userService;
        this.roleService = roleService;
        this.rolePermissionService = rolePermissionService;
        this.passwordEncoder = passwordEncoder;
        this.refValueService = refValueService;
    }

    @Override
    public void run(String... strings) {
        logger.info("Checking License ....");
        if(!checkLicense()){
            logger.info("Shutting down application");
            shutdownEndpoint.shutdown();
        }
        init();
    }

    private boolean checkLicense(){
        this.restTemplate = new RestTemplate();
        params = new LinkedMultiValueMap<String, String>();
        try {
            InetAddress IP = InetAddress.getLocalHost();
            params.add("ip",IP.toString());
            params.add("hostname",IP.getHostName());
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl("http://68.183.188.184/licence/diagnostic-center.json").queryParams(params).build();
        ResponseEntity<LicenseResponse> response = restTemplate.getForEntity(uriComponents.toUriString(),LicenseResponse.class);
        if (response.getStatusCodeValue() == 200){
            logger.info("-------------------------- License Response ---------------------------");
            LicenseResponse licenseResponse = response.getBody();
            logger.info("License Status : "+licenseResponse.isStatus());
            logger.info("License Message : "+licenseResponse.getMessage());
            return licenseResponse.isStatus();
        }else{
            logger.info("License Server Error!");
        }
        return false;
    }

    private void init(){
        Optional<Role> superRole = roleService.findByName("SUPER_ADMIN");
        if (!superRole.isPresent()){
            Role system = new Role();
            system.setId(1L);
            system.setEnabled(true);
            system.setName("SUPER_ADMIN");
            system.setDescription("This Is System. Cannot Use For Other Users");
            Role superAdmin = roleService.save(system);

            List<RolePermission> permissionList =  new ArrayList<>();
            for (Permission permission : Permission.values()) {
                RolePermission rolePermission = new RolePermission();
                rolePermission.setRole(system);
                rolePermission.setPermission(permission);
                rolePermission.setList(true);
                rolePermission.setView(true);
                rolePermission.setEdit(true);
                rolePermission.setCreate(true);
                rolePermission.setRemove(true);
                rolePermission.setPay(true);
                permissionList.add(rolePermission);
            }
            List<RolePermission> permissions = rolePermissionService.saveAll(permissionList);
            superAdmin.setPrivileges(permissions);

            Optional<User> optionalUser = userService.find(1L);
            if (!optionalUser.isPresent()){
                User user = new User();
                user.setId(1L);
                user.setFirstName("SUPER");
                user.setLastName("ADMIN");
                user.setEmail("rajibrobotics@gmail.com");
                user.setPassword(passwordEncoder.encode("Rajib123"));
                user.setEnabled(true);
                user.getRoles().add(superAdmin);
                userService.save(user);
            }
        }
        Optional<Configuration> configurationOptional = configurationService.findFirst();
        if (!configurationOptional.isPresent()){
            Configuration configuration = new Configuration();
            configurationService.save(configuration);
        }
        Optional<RefValue> refValueOptional = refValueService.find(1L);
        if (!refValueOptional.isPresent()){
            RefValue refValue = new RefValue();
            refValueService.save(refValue);
        }
    }
}
