package com.multipixeltec.dcservice.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-05
 * Developer : priyamal
 */
@Getter
@Setter
public class UpdatePasswordDto {
    private Long id;
    private String oldPassword;
    private String newPassword;
    private String newPasswordConfirm;
}
