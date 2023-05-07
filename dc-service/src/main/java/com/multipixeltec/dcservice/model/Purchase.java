package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.PurchaseStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.Date;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-18
 * Developer : priyamal
 */

@Entity
@Getter
@Setter
@Table(name = "PURCHASE")
public class Purchase extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "SUPPLIER_ID",insertable=false, updatable = false)
    private Long supplierId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="SUPPLIER_ID")
    private Supplier supplier;

    @Column(name = "REF_NO")
    private String refNo;

    @Column(name = "PURCHASE_DATE")
    private Date purchaseDate;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private PurchaseStatus status;

    @Column(name = "ATTACHMENT")
    private String attachment;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "NOTE")
    private String note;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ACCOUNT_ID",nullable = false)
    private Account account;

    @Column(name = "ACCOUNT_ID", insertable = false, updatable = false)
    private Long accountId;

    public String getSupplierName(){
        return supplier.getName();
    }
    public String getAccountName(){
        if (account==null)
            return "";
        return account.getName();
    }
}
