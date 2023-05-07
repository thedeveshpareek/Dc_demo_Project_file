package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.Role;
import com.multipixeltec.dcservice.repository.RoleRepository;
import com.multipixeltec.dcservice.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Optional<Role> find(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> findAll(Sort sort){
        return roleRepository.findAll(sort);
    }

    @Override
    public Page<Role> findAll(Pageable pageable){
        return roleRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    roleRepository.deleteById(id);
    }

    @Override
    public void delete(Role role) {
        roleRepository.delete(role);
    }

    @Override
    public void deleteAll() {
        roleRepository.deleteAll();
    }

    @Override
    public long count() {
        return roleRepository.count();
    }

    @Override
    public List<Role> findAllById(Set<Long> roles) {
        return roleRepository.findAllById(roles);
    }

    @Override
    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name);
    }

}
