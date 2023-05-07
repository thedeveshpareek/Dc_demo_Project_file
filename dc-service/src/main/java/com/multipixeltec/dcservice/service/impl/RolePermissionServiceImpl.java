package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.RolePermission;
import com.multipixeltec.dcservice.repository.RolePermissionRepository;
import com.multipixeltec.dcservice.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RolePermissionServiceImpl implements RolePermissionService {

    @Autowired
    private RolePermissionRepository rolepermissionRepository;

    @Override
    public RolePermission save(RolePermission rolepermission) {
        return rolepermissionRepository.save(rolepermission);
    }

    @Override
    public Optional<RolePermission> find(Long id) {
        return rolepermissionRepository.findById(id);
    }

    @Override
    public List<RolePermission> findAll() {
        return rolepermissionRepository.findAll();
    }

    @Override
    public List<RolePermission> findAll(Sort sort){
        return rolepermissionRepository.findAll(sort);
    }

    @Override
    public Page<RolePermission> findAll(Pageable pageable){
        return rolepermissionRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    rolepermissionRepository.deleteById(id);
    }

    @Override
    public void delete(RolePermission rolepermission) {
        rolepermissionRepository.delete(rolepermission);
    }

    @Override
    public void deleteAll() {
        rolepermissionRepository.deleteAll();
    }

    @Override
    public long count() {
        return rolepermissionRepository.count();
    }

    @Override
    public List<RolePermission> saveAll(List<RolePermission> permissions) {
        return rolepermissionRepository.saveAll(permissions);
    }

    @Override
    public void deleteAll(List<RolePermission> privileges) {
        rolepermissionRepository.deleteAll(privileges);
    }

    @Override
    public void deleteAll(Set<Long> longSet) {
        rolepermissionRepository.deleteAllByPermissionId(longSet);
    }

}
