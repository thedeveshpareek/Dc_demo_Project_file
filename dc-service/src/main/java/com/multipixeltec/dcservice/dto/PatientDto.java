package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.enums.ActiveStatus;
import com.multipixeltec.dcservice.enums.Gender;
import com.multipixeltec.dcservice.enums.MaritalStatus;
import com.multipixeltec.dcservice.model.Patient;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link Patient} entity
 */
@Data
public class PatientDto implements Serializable {
    private Date createdDate;
    private Date modifiedDate;
    private Long id;
    private String fullName;
    private String passportNo;
    private Date issueDate;
    private Date expiredDate;
    private String visaNo;
    private Date visaDate;
    private String travelingTo;
    private String presentAddress;
    private String pastAddress;
    private String mobile;
    private String email;
    private String group;
    private TestOrPackageDto testOrPackage;
    private AgentOrAgencyDto agentOrAgency;
    private Date deliveryDate;
    private String gender;
    private String maritalStatus;
    private Date dateOfBirth;
    private String fathersName;
    private String mothersName;
    private String nationality;
    private String religion;
    private String profession;
    private String nidNumber;
    private String specialNote;
    private String status;
}
