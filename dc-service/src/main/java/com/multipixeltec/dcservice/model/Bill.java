package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.BillStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "BILL")
public class Bill extends Auditable<User> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PATIENT_ID", insertable = false, updatable = false)
    private Long patientId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PATIENT_ID", nullable = false)
    private Patient patient;

    @Column(name = "TEST_ID", insertable = false, updatable = false)
    private Long testId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TEST_ID", nullable = false)
    private TestOrPackage test;

    @Column(name = "AGENT_ID", insertable = false, updatable = false)
    private Long agentId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AGENT_ID")
    private AgentOrAgency agent;

    @Column(name = "AMOUNT",columnDefinition = "Decimal(10,2) default '0.0'")
    private Double amount;

    @Column(name = "PAID",columnDefinition = "Decimal(10,2) default '0.0'")
    private Double paid;

    @Setter(AccessLevel.NONE)
    @Column(name = "DUE",columnDefinition = "Decimal(10,2) default '0.0'")
    private Double due;

    @Column(name = "COMMISSION",columnDefinition = "Decimal(10,2) default '0.0'")
    private Double commission;

    @Column(name = "NOTE")
    private String note;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private BillStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAID_BY")
    private User paidBy;

    @JsonIgnore
    @OneToMany(mappedBy = "bill", fetch = FetchType.LAZY)
    private Set<BillPayment> payments = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "bill", fetch = FetchType.LAZY)
    private Set<Commission> commissions = new HashSet<>();

    public void setPaid(double paid) {
        this.paid = paid;
        this.due = this.amount - this.paid;
        updateStatus();
    }

    public void addPayment(double payment) {
        this.paid = paid + payment;
        this.due = this.amount - this.paid;
        updateStatus();
    }

    private void updateStatus() {
        if (due == 0.0) {
            setStatus(BillStatus.PAID);
        } else {
            setStatus(BillStatus.PARTIALLY_PAID);
        }
    }

    public double getBalance() {
        return this.amount - this.paid;
    }
    public String getPatientName() {
        return patient.getFullName();
    }
    public String getPatientAddress() {
        return patient.getPermanentAddress();
    }
    public String getPassportNo() {
        return patient.getPassportNo();
    }
    public String getRegNo() {
        return patient.getRegNo();
    }
    public String getTestName() {
        return test.getName();
    }
    public String getTestDescription() {
        return test.getDescription();
    }
    public Double getTestPrice() {
        return test.getPrice();
    }
    public String getPaidBy() {
        return getModifiedBy().getFullName();
    }
    public String getAgentOrAgencyName() {
        if (agent == null)
            return "";
        return agent.getFullName();
    }

    public String getBillNo() {
        return String.format("%07d", id);
    }

    public String getQr(){
        String qr = "NAME:"+getPatientName()+"\n";
        qr = qr.concat("PASSPORT:"+getPassportNo()).concat("\n");
        qr = qr.concat("TRAVEL TO:"+patient.getPassportNo()).concat("\n");
        qr = qr.concat("AGENT:"+getAgentOrAgencyName()).concat("\n");
        return qr;
    }

}
