package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.FingerprintRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FingerprintRecordRepository extends JpaRepository<FingerprintRecord, Long> {
}
