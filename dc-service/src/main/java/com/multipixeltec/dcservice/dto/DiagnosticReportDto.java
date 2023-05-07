package com.multipixeltec.dcservice.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.DiagnosticReport} entity
 */
@Data
public class DiagnosticReportDto implements Serializable {
    private Long id;
    private Long testId;
    private Long patientId;
    private String description;
    private MultipartFile attachment;
}
