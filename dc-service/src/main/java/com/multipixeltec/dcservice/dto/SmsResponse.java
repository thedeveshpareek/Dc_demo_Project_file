package com.multipixeltec.dcservice.dto;

import lombok.Data;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-22
 * Developer : priyamal
 */
@Data
public class SmsResponse {
    private int response_code;
    private int message_id;
    private String success_message;
    private String error_message;
}
