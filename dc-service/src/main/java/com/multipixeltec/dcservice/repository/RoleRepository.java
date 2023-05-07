package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    @Query("FROM Role WHERE name=:name")
    Optional<Role> findByName(String name);
}
