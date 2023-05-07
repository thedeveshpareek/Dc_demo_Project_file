package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.model.BillPayment;
import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link BillPayment} entity
 */
@Data
public class BillPaymentDto implements Serializable {
    private final Long id;
    private final Long billId;
    private final Long accountId;
    private final Double amount;
}
