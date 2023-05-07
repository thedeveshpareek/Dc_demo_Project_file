package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.SmsResponse;
import org.springframework.stereotype.Service;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-22
 * Developer : priyamal
 */
public interface SmsService {
    public SmsResponse send(String number, String message);
    public SmsResponse send(String[] number,String message);
    public String balance();
}
