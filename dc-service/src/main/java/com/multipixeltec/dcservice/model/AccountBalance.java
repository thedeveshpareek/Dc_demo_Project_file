package com.multipixeltec.dcservice.model;

import lombok.Data;


/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-06
 * Developer : priyamal
 */
@Data
public class AccountBalance {
    private Long id;
    private String name;
    private String description;
    private Double credit;
    private Double debit;
    public Double getBalance(){
        return credit - debit;
    }
}
