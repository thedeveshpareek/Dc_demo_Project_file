package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}