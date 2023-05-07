package com.multipixeltec.dcservice.dto;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link com.multipixeltec.dcservice.model.User} entity
 */
@Data
public class UserDto implements Serializable {
    private final Long id;
    private final String email;
    private final String firstName;
    private final String lastName;
    private final String password;
    private final boolean enabled;
    private final Long roleId;
}
