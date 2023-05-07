package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.CommissionStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;

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
@Table(name = "COMMISSION")
public class Commission extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "BILL_ID",insertable=false, updatable = false)
    private Long billId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="BILL_ID",nullable = false)
    private Bill bill;

    @Column(name = "AGENT_OR_AGENCY_ID",insertable=false, updatable = false)
    private Long agentOrAgencyId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="AGENT_OR_AGENCY_ID",nullable = false)
    private AgentOrAgency agentOrAgency;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "PAID")
    private Double paid;

    @Column(name = "DUE")
    private Double due;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private CommissionStatus status;

    public String getAgentName() {
        return agentOrAgency.getFullName();
    }

    public String getAgencyName() {
        return agentOrAgency.getFullName();
    }

    public String getPatientName() {
        return bill.getPatientName();
    }

    public String getBillNo() {
        return bill.getBillNo();
    }
}
