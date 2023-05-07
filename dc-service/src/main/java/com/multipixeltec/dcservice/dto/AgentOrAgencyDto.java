package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import com.multipixeltec.dcservice.model.User;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * A DTO for the {@link AgentOrAgency} entity
 */
@Data
public class AgentOrAgencyDto implements Serializable {
    private UserDto createdBy;
    private Date createdDate;
    private UserDto modifiedBy;
    private Date modifiedDate;
    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private String address;
    private Double commissionRate;
    private Double commissionAmount;
    private AgentAgency type;
}
