package com.multipixeltec.dcservice.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Bill} entity
 */
@Data
public class BillDto implements Serializable {
    private Long id;
    private String billNo;
    private Long patientId;
    private Long testId;
    private Long agentId;
    private Double amount;
    private Double paid;
    private Double due;
    private Double agentCommission;
    private Double agencyCommission;
    private String note;
}
