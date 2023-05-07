package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "PATIENT")
public class Patient extends Auditable<User>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "REG_NO",unique = true)
    private String regNo;
    @Column(name = "PASSPORT_NO",unique = true)
    private String passportNo;

    @Column(name = "ISSUE_DATE")
    private Date issueDate;

    @Column(name = "EXPIRED_DATE")
    private Date expiredDate;

    @Column(name = "VISA_NO")
    private String visaNo;

    @Column(name = "VISA_DATE")
    private Date visaDate;

    @Column(name = "TRAVELING_TO")
    private String travelingTo;

    @Column(name = "PRESENT_ADDRESS")
    private String presentAddress;

    @Column(name = "PERMANENT_ADDRESS")
    private String permanentAddress;

    @Column(name = "MOBILE")
    private String mobile;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "SELECT_GROUP")
    private String group;

    @Column(name = "TEST_OR_PACKAGE_ID",insertable=false, updatable = false)
    private Long testOrPackageId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TEST_OR_PACKAGE_ID",nullable = true)
    private TestOrPackage testOrPackage;

    @Column(name = "AGENCY_OR_AGENCY_ID",insertable=false, updatable = false)
    private Long agentOrAgencyId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="AGENCY_OR_AGENCY_ID",nullable = true)
    private AgentOrAgency agentOrAgency;

    @Column(name = "DELIVERY_DATE")
    private Date deliveryDate;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "GENDER")
    private Gender gender;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "MARITAL_STATUS",nullable = true)
    private MaritalStatus maritalStatus;

    @Column(name = "DATE_OF_BIRTH")
    private Date dateOfBirth;

    @Column(name = "FATHERS_NAME")
    private String fathersName;

    @Column(name = "MOTHERS_NAME")
    private String mothersName;

    @Column(name = "NATIONALITY")
    private String nationality;

    @Column(name = "RELIGION")
    private String religion;

    @Column(name = "PROFESSION")
    private String profession;

    @Column(name = "NID_NUMBER")
    private String nidNumber;

    @Column(name = "SPECIAL_NOTE")
    private String specialNote;

    @Column(name = "PHOTO")
    private String photo;

    @Column(name = "FINGER_PRINT")
    private String fingerPrint;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ActiveStatus status;

    @JsonIgnore
    @OneToMany(mappedBy = "patient",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Bill> bills;

    @OneToOne(mappedBy = "patient")
    private PatientReport report;

    @Column(name = "FINGER_RECORD_ID")
    private Long fingerId;

    @Column(name = "PAY_NOW")
    private Boolean payNow;

    public String getTestOrPackageName(){
        if (this.testOrPackage ==null)
            return "";
        return this.testOrPackage.getName();
    }

    public String getAgentOrAgencyName(){
        if (this.agentOrAgency ==null)
            return "";
        return this.agentOrAgency.getFullName();
    }

    public String getReportUrl(){
        return "/patients/"+id+"/report";
    }

    public String getProgress(){
        if (bills == null){
            return "PENDING_BILL";
        }
        long count = bills.stream().filter(bill -> bill.getStatus() != BillStatus.PAID).count();
        if (count > 0){
            return "PAYMENT_DUE";
        } else if(!report.IsXrayAttached()) {
            return "XRAY_PENDING";
        }else if(report.getStatus() == null){
            return "REPORT_PENDING";
        }else{
            return "COMPLETED";
        }
    }

    public String getHealthStatus(){
        if (report == null || report.getStatus() == null){
            return "PENDING";
        }
        return report.getStatus().name();
    }

    public String getQr(){
        String qr = "NAME:"+fullName+"\n";
        qr = qr.concat("PASSPORT:"+passportNo).concat("\n");
        qr = qr.concat("AGENT:"+getAgentOrAgencyName()).concat("\n");
        if (report!=null && report.getStatus()!=null) {
            qr = qr.concat("STATUS:" + getReport().getStatus().name()).concat("\n");
        }
        return qr;
    }


}
