package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.FingerprintRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface FingerprintRecordService {

    FingerprintRecord save(FingerprintRecord fingerprintrecord);

    Optional<FingerprintRecord> find(Long id);

    List<FingerprintRecord> findAll();

    List<FingerprintRecord> findAll(Sort sort);

    Page<FingerprintRecord> findAll(Pageable pageable);

    void delete(Long id);

    void delete(FingerprintRecord fingerprintrecord);

    void deleteAll();

    long count();

}
