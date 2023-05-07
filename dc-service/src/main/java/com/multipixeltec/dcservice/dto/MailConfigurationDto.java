package com.multipixeltec.dcservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Configuration} entity
 */
@Data
public class MailConfigurationDto implements Serializable {
    private final Long id;
    private final String mailDriver;
    private final String mailHost;
    private final String mailPort;
    private final String mailUsername;
    private final String mailPassword;
    private final String mailEncryption;
    private final String mailFromAddress;
    private final String mailFromName;
}
