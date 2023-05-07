package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.BillStatus;
import com.multipixeltec.dcservice.enums.Permission;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;

@Entity
@Getter
@Setter
@Table(name = "ROLE_PRIVILEGE")
public class RolePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ROLE_ID",insertable=false, updatable = false)
    private Long roleId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ROLE_ID",nullable = false)
    private Role role;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "PERMISSION")
    private Permission permission;

    @Column(name = "ACCESS_LIST")
    private Boolean list;

    @Column(name = "ACCESS_VIEW")
    private Boolean view;

    @Column(name = "ACCESS_CREATE")
    private Boolean create;

    @Column(name = "ACCESS_EDIT")
    private Boolean edit;

    @Column(name = "ACCESS_REMOVE")
    private Boolean remove;

    @Column(name = "ACCESS_PAY")
    private Boolean pay;
}
