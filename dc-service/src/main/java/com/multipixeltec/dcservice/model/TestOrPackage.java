package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.multipixeltec.dcservice.enums.ActiveStatus;
import com.multipixeltec.dcservice.enums.TestPackage;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "TEST_OR_PACKAGE")
public class TestOrPackage extends Auditable<User>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "DEPARTMENT")
    private String department;

    @Column(name = "METHOD")
    private String method;

    @Column(name = "SAMPLE")
    private String sample;

    @Column(name = "ABBREVIATION")
    private String abbreviation;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE",nullable = false)
    private TestPackage type;

    @Valid
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15,name = "ACTIVE_STATUS")
    private ActiveStatus activeStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "pkg", fetch = FetchType.LAZY)
    private Set<PackageItem> packageItems = new HashSet<>();

    public String getNameWithPrice(){
        return name+" - "+price;
    }
    public boolean equals(TestOrPackage test) {
        if (test == null) {
            return false;
        }
        if (getClass() != test.getClass()) {
            return false;
        }
        if (this.id != test.id) {
            return false;
        }
        return true;
    }


}
