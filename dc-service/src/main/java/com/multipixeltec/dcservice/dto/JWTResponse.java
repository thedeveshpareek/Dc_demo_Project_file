package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.model.User;
import lombok.Getter;
import lombok.Setter;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-04
 * Developer : priyamal
 */
@Getter
@Setter
public class JWTResponse {
    private String error;
    private String accessToken;
    private String refreshToken;
    private User user;
}
