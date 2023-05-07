package com.multipixeltec.dcservice.model;

import com.multipixeltec.dcservice.enums.AgentAgency;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;

@Entity
@Getter
@Setter
@Table(name = "AGENT_OR_AGENCY")
public class AgentOrAgency extends Auditable<User>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "EMAIL",unique = true)
    private String email;
    @Column(name = "MOBILE")
    private String mobile;
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "COMMISSION_RATE")
    private Double commissionRate;
    @Column(name = "COMMISSION_AMOUNT")
    private Double commissionAmount;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE")
    private AgentAgency type;
}
