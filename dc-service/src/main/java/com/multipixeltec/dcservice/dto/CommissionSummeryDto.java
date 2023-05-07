package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.model.BillPayment;
import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link BillPayment} entity
 */
@Data
public class CommissionSummeryDto implements Serializable {
    private Long totalBills;
    private Long completedBills;
    private Long pendingBills;
    private Double dueAmount;
}
