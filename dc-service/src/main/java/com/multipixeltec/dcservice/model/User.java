package com.multipixeltec.dcservice.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(unique = true, name = "EMAIL")
    private String email;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "ENABLED")
    private boolean enabled;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "USER_ROLE",joinColumns = @JoinColumn(name = "USER_ID"),inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
    private Set<Role> roles = new HashSet<>();

    public Long getRoleId(){
        if (roles.isEmpty())
            return 0L;
        else
            return this.roles.iterator().next().getId();
    }
    public String getFullName() {
        return firstName.concat(" ").concat(lastName);
    }

    public void addRole(Role role) {
        roles.add(role);
    }

    public boolean equals(User user) {
        if (user == null) {
            return false;
        }
        if (getClass() != user.getClass()) {
            return false;
        }
        if (this.id != user.id) {
            return false;
        }
        return true;
    }

    public boolean hasRole(String super_admin) {
        if (roles.isEmpty())
            return false;
        else
            return roles.stream().filter(role -> role.getName().equals(super_admin)).findAny().isPresent();
    }
}
