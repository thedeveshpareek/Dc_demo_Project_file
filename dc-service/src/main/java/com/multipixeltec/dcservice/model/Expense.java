package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
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
@Table(name = "EXPENSE")
public class Expense extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "MAIN_ID",insertable=false, updatable = false)
    private Long mainCategoryId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="MAIN_ID")
    private ExpenseCategory mainCategory;

    @Column(name = "SUB_ID",insertable=false, updatable = false)
    private Long subCategoryId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="SUB_ID")
    private ExpenseCategory subCategory;

    @Column(name = "REF_NO")
    private String refNo;

    @Column(name = "EXP_DATE")
    private Date date;

    @Column(name = "EXPENSE_FOR")
    private String expenseFor;

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

    /*@Column(name = "RECURRING")
    private Boolean recurring;

    @Column(name = "RECURRING_INTERVAL")
    private Integer recurringInterval;

    @Column(name = "RECURRING_PERIOD")
    private Integer recurringPeriod;

    @Column(name = "NO_OF_REPETITIONS")
    private Integer noOfRepetitions;

    @Column(name = "REPEAT_ON")
    private Integer repeatOn;*/




    public String getCategoryName(){
        if(mainCategory == null )
            return "";
        return mainCategory.getName();
    }
    public String getSubCategoryName(){
        if(subCategory == null )
            return "";
        return subCategory.getName();
    }

    public String getAccountName(){
        if (account==null)
            return "";
        return account.getName();
    }
}
