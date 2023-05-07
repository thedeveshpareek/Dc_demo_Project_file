package com.multipixeltec.dcservice.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.multipixeltec.dcservice.dto.UserDetails;
import com.multipixeltec.dcservice.util.AppUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.Duration;
import java.time.Instant;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-03-08
 * Developer : priyamal
 */
@Service
public class JwtTokenService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final Duration JWT_TOKEN_VALIDITY = Duration.ofDays(1);
    private static final Duration REFRESH_TOKEN_VALIDITY = Duration.ofDays(265);
    private final Algorithm hmac512;
    private final JWTVerifier verifier;
    private final String salt;

    public JwtTokenService(@Value("${jwt.secret}") final String secret,@Value("${security.salt}") final String salt) {
        this.hmac512 = Algorithm.HMAC512(secret);
        this.verifier = JWT.require(this.hmac512).build();
        this.salt = salt;
    }

    public String generateToken(final AppUserDetails userDetails) {
        final Instant now = Instant.now();
        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuer(salt)
                .withIssuedAt(now)
                .withExpiresAt(now.plusMillis(JWT_TOKEN_VALIDITY.toMillis()))
                .sign(this.hmac512);
    }

    public String generateRefreshToken(AppUserDetails userDetails) {
        final Instant now = Instant.now();
        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuer(salt)
                .withIssuedAt(now)
                .withExpiresAt(now.plusMillis(REFRESH_TOKEN_VALIDITY.toMillis()))
                .sign(this.hmac512);
    }

    public String validateTokenAndGetUsername(final String token) {
        try {
            return verifier.verify(token).getSubject();
        } catch (final JWTVerificationException verificationEx) {
            logger.warn("token invalid: {}", verificationEx.getMessage());
            return null;
        }
    }


    public String getToken(HttpServletRequest request) {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }
        return header.substring(7);
    }

    public String getUsernameFromToken(String token) {
        final String username = validateTokenAndGetUsername(token);
        if (username == null) {
            return null;
        }
        return username;
    }
}
