package com.multipixeltec.dcservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Configuration} entity
 */
@Data
public class LabReportDto implements Serializable {
    private final Long id;
    private final String device;
    private final List<MultipartFile> files;
}
