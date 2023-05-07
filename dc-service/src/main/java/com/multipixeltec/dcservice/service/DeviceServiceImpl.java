package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.Device;
import com.multipixeltec.dcservice.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    @Override
    public Optional<Device> find(Long id) {
        return deviceRepository.findById(id);
    }

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Override
    public List<Device> findAll(Sort sort){
        return deviceRepository.findAll(sort);
    }

    @Override
    public Page<Device> findAll(Pageable pageable){
        return deviceRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    deviceRepository.deleteById(id);
    }

    @Override
    public void delete(Device device) {
        deviceRepository.delete(device);
    }

    @Override
    public void deleteAll() {
        deviceRepository.deleteAll();
    }

    @Override
    public long count() {
        return deviceRepository.count();
    }

}