package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.Device;
import com.multipixeltec.dcservice.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @PostMapping("/device")
    public Device save(@RequestBody Device device){
        return deviceService.save(device);
    }

    @GetMapping("/device/{id}")
    public Optional<Device> getById(@PathVariable(value = "id") Long id){
        return deviceService.find(id);
    }

    @GetMapping("/device")
    public List<Device> getAll(){
        return deviceService.findAll();
    }

    @DeleteMapping("/device/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        deviceService.delete(id);
    }

    @DeleteMapping("/device")
    public void deleteAll(){
        deviceService.deleteAll();
    }

    @GetMapping("/device/count")
    public long count(){
        return deviceService.count();
    }
}