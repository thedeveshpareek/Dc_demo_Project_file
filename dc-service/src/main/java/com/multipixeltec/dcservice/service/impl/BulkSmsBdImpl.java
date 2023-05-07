package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.SmsResponse;
import com.multipixeltec.dcservice.model.Configuration;
import com.multipixeltec.dcservice.repository.ConfigurationRepository;
import com.multipixeltec.dcservice.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-22
 * Developer : priyamal
 */
@Service
public class BulkSmsBdImpl implements SmsService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ConfigurationRepository repository;
    private RestTemplate restTemplate;
    private String url;
    private String method;
    private MultiValueMap<String,String> headers;
    private MultiValueMap<String,String> params;
    public BulkSmsBdImpl(ConfigurationRepository repository) {
        this.repository = repository;
    }

    private void init(){
        logger.info("SMS Init");
        Optional<Configuration> first = repository.findAll().stream().findFirst();
        if (first.isPresent()){
            Configuration configuration = first.get();
            headers = new LinkedMultiValueMap<String, String>();
            params = new LinkedMultiValueMap<String, String>();
            url = configuration.getSmsUrl();
            method = configuration.getSmsMethod();
            headers.add(configuration.getSmsHeader1key(),configuration.getSmsHeader1value());
            headers.add(configuration.getSmsHeader2key(),configuration.getSmsHeader2value());
            headers.add(configuration.getSmsHeader3key(),configuration.getSmsHeader3value());
            params.add(configuration.getSmsParameter1key(),configuration.getSmsParameter1value());
            params.add(configuration.getSmsParameter2key(),configuration.getSmsParameter2value());
            params.add(configuration.getSmsParameter3key(),configuration.getSmsParameter3value());
            params.add(configuration.getSmsParameter4key(),configuration.getSmsParameter4value());
            params.add(configuration.getSmsParameter5key(),configuration.getSmsParameter5value());
            this.restTemplate = new RestTemplate();
        }
    }

    @Override
    public SmsResponse send(String number, String message) {
        init();
        if (url != null && url.startsWith("http")){
            params.add("number",number);
            params.add("message",message);
            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).queryParams(params).build();
            logger.info(uriComponents.toString());
            ResponseEntity<SmsResponse> response = restTemplate.getForEntity(uriComponents.toUriString(), SmsResponse.class);
            return response.getBody();
        }else {
            SmsResponse smsResponse = new SmsResponse();
            smsResponse.setResponse_code(500);
            smsResponse.setError_message("Invalid Sms Configurations!");
            return smsResponse;
        }

    }

    @Override
    public SmsResponse send(String[] number, String message) {
        init();
        params.add("number",number[0]);
        params.add("message",message);
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).queryParams(params).build();
        logger.info(uriComponents.toString());
        ResponseEntity<SmsResponse> response = restTemplate.getForEntity(uriComponents.toUriString(), SmsResponse.class);
        return response.getBody();
    }

    @Override
    public String balance() {
        String uri = "http://bulksmsbd.net/api/getBalanceApi";
        uri = uri.concat("?");
        uri = uri.concat("api_key=7MGIbP4GRjUbP9BvKnau");
        return restTemplate.getForObject(uri, String.class);
    }
}
