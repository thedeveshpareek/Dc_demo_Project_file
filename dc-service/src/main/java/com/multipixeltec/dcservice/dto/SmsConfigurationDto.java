package com.multipixeltec.dcservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Configuration} entity
 */
@Data
public class SmsConfigurationDto implements Serializable {
    private final Long id;
    private final String smsService;
    private final String smsUrl;
    private final String smsMethod;

    private final String smsHeader1key;
    private final String smsHeader1value;
    private final String smsHeader2key;
    private final String smsHeader2value;
    private final String smsHeader3key;
    private final String smsHeader3value;

    private final String smsParameter1key;
    private final String smsParameter1value;
    private final String smsParameter2key;
    private final String smsParameter2value;
    private final String smsParameter3key;
    private final String smsParameter3value;
    private final String smsParameter4key;
    private final String smsParameter4value;
    private final String smsParameter5key;
    private final String smsParameter5value;
}
