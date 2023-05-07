package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface RoleService {

    Role save(Role role);

    Optional<Role> find(Long id);

    List<Role> findAll();

    List<Role> findAll(Sort sort);

    Page<Role> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Role role);

    void deleteAll();

    long count();

    List<Role> findAllById(Set<Long> roles);

    Optional<Role> findByName(String name);
}
