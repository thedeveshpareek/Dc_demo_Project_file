package com.multipixeltec.dcservice.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
@Table(name = "LAB_REPORTS")
public class LabReport extends Auditable<User> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "REPORT_TYPE")
    private String type;

    @Column(name = "FILE_NAME")
    private String name;

    @Column(name = "FILE_PATH")
    private String filePath;
}
