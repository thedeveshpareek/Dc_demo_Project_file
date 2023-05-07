package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.RolePermission;
import org.hibernate.annotations.SQLUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Set;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM ROLE_PRIVILEGE WHERE ID IN (:longSet)",nativeQuery = true)
    void deleteAllByPermissionId(Set<Long> longSet);
}
