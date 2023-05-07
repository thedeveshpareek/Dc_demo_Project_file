package com.multipixeltec.dcservice.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Role} entity
 */
@Data
public class RolePermissionDto implements Serializable {
    private Long id;
    private String field;
    private boolean value;
}
