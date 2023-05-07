package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.RolePermissionDto;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.RolePermission;
import com.multipixeltec.dcservice.service.RolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class RolePermissionController {

    @Autowired
    private RolePermissionService rolepermissionService;

    @PostMapping("/role-permission")
    public RolePermission save(@RequestBody RolePermission rolepermission){
        return rolepermissionService.save(rolepermission);
    }

    @PutMapping("/role-permission")
    public RolePermission update(@RequestBody RolePermissionDto permissionDto){
        Optional<RolePermission> optionalRolePermission = rolepermissionService.find(permissionDto.getId());
        if (optionalRolePermission.isPresent()) {
            RolePermission permission = optionalRolePermission.get();
            switch (permissionDto.getField()){
                case "list" : permission.setList(permissionDto.isValue()); break;
                case "create" : permission.setCreate(permissionDto.isValue()); break;
                case "view" : permission.setView(permissionDto.isValue()); break;
                case "remove" : permission.setRemove(permissionDto.isValue()); break;
                case "edit" : permission.setEdit(permissionDto.isValue()); break;
                case "pay" : permission.setPay(permissionDto.isValue()); break;
            }
            return rolepermissionService.save(permission);
        }else {
            throw new NotFoundException("Permission Not Found!");
        }
    }

    @GetMapping("/role-permission/{id}")
    public Optional<RolePermission> getById(@PathVariable(value = "id") Long id){
        return rolepermissionService.find(id);
    }

    @GetMapping("/role-permission")
    public List<RolePermission> getAll(){
        return rolepermissionService.findAll();
    }

    @DeleteMapping("/role-permission/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        rolepermissionService.delete(id);
    }

    @DeleteMapping("/role-permission")
    public void deleteAll(){
        rolepermissionService.deleteAll();
    }

    @GetMapping("/role-permission/count")
    public long count(){
        return rolepermissionService.count();
    }

}
