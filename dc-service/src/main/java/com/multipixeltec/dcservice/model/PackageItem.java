package com.multipixeltec.dcservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "PACKAGE_ITEM")
public class PackageItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PAKCAGE_ID",insertable=false, updatable = false)
    private Long pkgId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="PAKCAGE_ID",nullable = false)
    private TestOrPackage pkg;

    @Column(name = "TEST_ID",insertable=false, updatable = false)
    private Long testId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="TEST_ID",nullable = false)
    private TestOrPackage test;

    public String getName() {
        return test.getName();
    }

    public String getDescription() {
        return test.getDescription();
    }

    public Double getPrice() {
        return test.getPrice();
    }

    public String getDepartment() {
        return test.getDepartment();
    }

    public String getMethod() {
        return test.getMethod();
    }

    public String getSample() {
        return test.getSample();
    }

    public boolean equals(PackageItem item) {
        if (item == null) {
            return false;
        }
        if (getClass() != item.getClass()) {
            return false;
        }
        if (this.id != item.id) {
            return false;
        }
        return true;
    }
}
