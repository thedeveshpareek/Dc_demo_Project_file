package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.SmsResponse;
import com.multipixeltec.dcservice.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-08
 * Developer : priyamal
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class SmsController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @GetMapping("/sms/send")
    public SmsResponse send(@RequestParam("number") String number, @RequestParam("message") String message) {
        return smsService.send(number,message);
    }

    @GetMapping("/sms/balance")
    public String balance() {
        return smsService.balance();
    }

}
