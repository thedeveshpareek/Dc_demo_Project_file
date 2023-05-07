package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.ReportStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;

@Entity
@Getter
@Setter
@Table(name = "DIAGNOSTIC_TEST_REPORT")
public class DiagnosticReport extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TEST_ID",insertable=false, updatable = false)
    private Long testId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TEST_ID",nullable = false)
    private TestOrPackage test;

    @Column(name = "PATIENT_ID",insertable=false, updatable = false)
    private Long patientId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PATIENT_ID",nullable = false)
    private Patient patient;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "ATTACHMENT")
    private String attachment;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS",nullable = false, length = 15)
    private ReportStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="APPROVED_BY",nullable = true)
    private User approvedBy;

    public String getTestName(){
        return test.getName();
    }

    public String getPatientName(){
        return patient.getFullName();
    }

}
