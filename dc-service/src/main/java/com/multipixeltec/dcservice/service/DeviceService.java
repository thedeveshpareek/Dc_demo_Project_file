package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface DeviceService {

    Device save(Device device);

    Optional<Device> find(Long id);

    List<Device> findAll();

    List<Device> findAll(Sort sort);

    Page<Device> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Device device);

    void deleteAll();

    long count();

}