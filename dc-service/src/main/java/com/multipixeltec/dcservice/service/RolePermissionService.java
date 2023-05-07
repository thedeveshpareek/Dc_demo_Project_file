package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.RolePermission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface RolePermissionService {

    RolePermission save(RolePermission rolepermission);

    Optional<RolePermission> find(Long id);

    List<RolePermission> findAll();

    List<RolePermission> findAll(Sort sort);

    Page<RolePermission> findAll(Pageable pageable);

    void delete(Long id);

    void delete(RolePermission rolepermission);

    void deleteAll();

    long count();

    List<RolePermission> saveAll(List<RolePermission> permissions);

    void deleteAll(List<RolePermission> privileges);

    void deleteAll(Set<Long> longSet);
}
