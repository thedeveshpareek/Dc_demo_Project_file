package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.enums.PurchaseStatus;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Purchase} entity
 */
@Data
public class PurchaseDto implements Serializable {
    private Long id;
    private Long supplierId;
    private Long accountId;
    private String refNo;
    @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)
    private Date purchaseDate;
    private String status;
    private MultipartFile attachment;
    private Double amount;
    private String note;
}
