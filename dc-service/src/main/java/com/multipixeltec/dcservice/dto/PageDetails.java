package com.multipixeltec.dcservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-04
 * Developer : priyamal
 */
@Getter
@Setter
@NoArgsConstructor
public class PageDetails {
    private Integer pageNumber;
    private Integer pageSize;
    private String column;
    private String sort;
    private String text;
    private String from;
    private String to;
    private Long total;
    private List data;
    public PageDetails(String from,String to){
        this.from = from;
        this.to = to;
    }

    @Override
    public String toString() {
        return "PageDetails{" +
                "pageNumber=" + pageNumber +
                ", pageSize=" + pageSize +
                ", column='" + column + '\'' +
                ", sort='" + sort + '\'' +
                ", text='" + text + '\'' +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", total=" + total +
                ", data=" + data +
                '}';
    }
}
