package com.multipixeltec.dcservice.util;

import org.springframework.data.domain.Sort;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-02-02
 * Developer : priyamal
 */
public class SortColumn {

    public static Sort patient(String column,String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "fullName" : sort = Sort.by("FULL_NAME");break;
            case "regNo" : sort = Sort.by("REG_NO");break;
            case "passportNo" : sort = Sort.by("PASSPORT_NO");break;
            case "mobile" : sort = Sort.by("MOBILE");break;
            case "status" : sort = Sort.by("STATUS");break;
            case "progress" : sort = Sort.by("PROGRESS");break;
            case "agentOrAgencyName" : sort = Sort.by("AGENCY_OR_AGENCY_ID");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort bill(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "commission" : sort = Sort.by("COMMISSION");break;
            case "paid" : sort = Sort.by("PAID");break;
            case "due" : sort = Sort.by("DUE");break;
            case "agentOrAgencyName" : sort = Sort.by("AGENT_ID");break;
            case "status" : sort = Sort.by("STATUS");break;
            case "createdByName" : sort = Sort.by("CREATED_BY");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort commission(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "billNo" : sort = Sort.by("BILL_ID");break;
            case "agentName" : sort = Sort.by("AGENT_OR_AGENCY_ID");break;
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "paid" : sort = Sort.by("PAID");break;
            case "due" : sort = Sort.by("DUE");break;
            case "status" : sort = Sort.by("STATUS");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort purchase(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "supplierName" : sort = Sort.by("SUPPLIER_ID");break;
            case "refNo" : sort = Sort.by("REF_NO");break;
            case "purchaseDate" : sort = Sort.by("PURCHASE_DATE");break;
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "accountName" : sort = Sort.by("ACCOUNT_ID");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort expenses(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "categoryName" : sort = Sort.by("MAIN_ID");break;
            case "subCategoryName" : sort = Sort.by("SUB_ID");break;
            case "date" : sort = Sort.by("EXP_DATE");break;
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "accountName" : sort = Sort.by("ACCOUNT_ID");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort billPayment(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "billNo" : sort = Sort.by("BILL_ID");break;
            case "accountName" : sort = Sort.by("ACCOUNT_ID");break;
            case "createdByName" : sort = Sort.by("CREATED_BY");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort accountTransfer(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "amount" : sort = Sort.by("AMOUNT");break;
            case "description" : sort = Sort.by("DESCRIPTION");break;
            case "accountName" : sort = Sort.by("ACCOUNT_ID");break;
            case "createdByName" : sort = Sort.by("CREATED_BY");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }

    public static Sort supplier(String column, String order) {
        Sort sort;
        if (column == null) {
            return Sort.by("ID").descending();
        }
        switch (column){
            case "company" : sort = Sort.by("COMPANY");break;
            case "contactNo" : sort = Sort.by("CONTACT_NO");break;
            case "email" : sort = Sort.by("EMAIL");break;
            case "name" : sort = Sort.by("NAME");break;
            default : sort = Sort.by("ID");break;
        }
        return order.equalsIgnoreCase("ASC")? sort.ascending():sort.descending();
    }
}
