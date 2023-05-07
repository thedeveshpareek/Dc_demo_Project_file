package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.enums.Permission;
import com.multipixeltec.dcservice.model.Role;
import com.multipixeltec.dcservice.model.RolePermission;
import com.multipixeltec.dcservice.service.RolePermissionService;
import com.multipixeltec.dcservice.service.RoleService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class RoleController {

    private final RoleService roleService;
    private final RolePermissionService rolePermissionService;

    public RoleController(RoleService roleService, RolePermissionService rolePermissionService) {
        this.roleService = roleService;
        this.rolePermissionService = rolePermissionService;
    }

    @PostMapping("/role")
    public Role save(@RequestBody Role role){
        boolean isNew = role.getId() == null || role.getId() == 0;
        Role save = roleService.save(role);
        if (isNew){
            List<RolePermission> permissions =  new ArrayList<>();
            for (Permission permission : Permission.values()) {
                RolePermission rolePermission = new RolePermission();
                rolePermission.setRole(save);
                rolePermission.setPermission(permission);
                permissions.add(rolePermission);
            }
            rolePermissionService.saveAll(permissions);
        }
        return save;
    }

    @GetMapping("/role/{id}")
    public Optional<Role> getById(@PathVariable(value = "id") Long id){
        return roleService.find(id);
    }

    @GetMapping("/role")
    public List<Role> getAll(){
        List<Role> roles = roleService.findAll();
        if (roles!=null){
            return roles.stream().filter(role -> !role.getName().equals("SUPER_ADMIN")).collect(Collectors.toList());
        }
        return roles;
    }

    @DeleteMapping("/role/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        roleService.delete(id);
    }

    @DeleteMapping("/role")
    public void deleteAll(){
        roleService.deleteAll();
    }

    @GetMapping("/role/count")
    public long count(){
        return roleService.count();
    }

    @GetMapping("/role/fix")
    public void fix(){
        List<Role> roles = roleService.findAll();
        for (Role role : roles) {
            List<RolePermission> permissionList =  new ArrayList<>();
            if (!role.getName().equalsIgnoreCase("SUPER_ADMIN")){
                List<RolePermission> privileges = role.getPrivileges();
                Set<Long> longSet = privileges.stream().map(RolePermission::getId).collect(Collectors.toSet());
                System.out.println(longSet.toString());
                rolePermissionService.deleteAll(longSet);
                for (Permission permission : Permission.values()) {
                    RolePermission rolePermission = new RolePermission();
                    rolePermission.setRole(role);
                    rolePermission.setPermission(permission);
                    rolePermission.setList(false);
                    rolePermission.setCreate(false);
                    rolePermission.setEdit(false);
                    rolePermission.setView(false);
                    rolePermission.setRemove(false);
                    rolePermission.setPay(false);
                    permissionList.add(rolePermission);
                }
            }
            List<RolePermission> permissions = rolePermissionService.saveAll(permissionList);
        }
    }
}
