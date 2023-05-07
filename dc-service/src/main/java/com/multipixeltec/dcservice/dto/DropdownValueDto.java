package com.multipixeltec.dcservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.Role} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DropdownValueDto implements Serializable {
    private Long id;
    private String name;
}
