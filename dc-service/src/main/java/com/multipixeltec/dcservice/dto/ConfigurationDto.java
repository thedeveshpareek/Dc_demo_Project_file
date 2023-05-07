package com.multipixeltec.dcservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Configuration} entity
 */
@Data
public class ConfigurationDto implements Serializable {
    private final Long id;
    private final String businessName;
    private final String currency;
    private final String dateFormat;
    private final MultipartFile logo;

    private final String mailDriver;
    private final String mailHost;
    private final String mailPort;
    private final String mailUsername;
    private final String mailPassword;
    private final String mailEncryption;
    private final String mailFromAddress;
    private final String mailFromName;

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

    private MultipartFile reportCompanyLogo;
    private MultipartFile reportDoctorSeal;
    private String reportAddress;
    private String reportContactNumber;
    private String reportEmail;

    private MultipartFile invoiceLogo;
    private MultipartFile invoiceSeal;
    private String invoiceAddress;
    private String invoiceContactNumber;
    private String invoiceEmail;
    private String reportUrl;
    private String websiteUrl;
}
