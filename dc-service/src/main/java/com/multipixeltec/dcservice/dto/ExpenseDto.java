package com.multipixeltec.dcservice.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Expense} entity
 */
@Data
public class ExpenseDto implements Serializable {
    private Long id;
    private Long mainCategoryId;
    private Long subCategoryId;
    private Long accountId;
    private String refNo;
    @DateTimeFormat(iso= DateTimeFormat.ISO.DATE)
    private Date date;
    private String expenseFor;
    private MultipartFile attachment;
    private Double amount;
    private String note;
}
