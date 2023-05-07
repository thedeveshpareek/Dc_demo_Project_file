package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.enums.ActiveStatus;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.model.User;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * A DTO for the {@link TestOrPackage} entity
 */
@Data
public class TestOrPackageDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String department;
    private String method;
    private String sample;
    private String type;
    private String abbreviation;
    private String activeStatus;
    private List<Long> testIds;
}
