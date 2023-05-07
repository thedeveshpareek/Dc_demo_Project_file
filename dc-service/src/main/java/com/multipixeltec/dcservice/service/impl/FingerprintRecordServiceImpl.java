package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.FingerprintRecord;
import com.multipixeltec.dcservice.repository.FingerprintRecordRepository;
import com.multipixeltec.dcservice.service.FingerprintRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FingerprintRecordServiceImpl implements FingerprintRecordService {

    @Autowired
    private FingerprintRecordRepository fingerprintrecordRepository;

    @Override
    public FingerprintRecord save(FingerprintRecord fingerprintrecord) {
        return fingerprintrecordRepository.save(fingerprintrecord);
    }

    @Override
    public Optional<FingerprintRecord> find(Long id) {
        return fingerprintrecordRepository.findById(id);
    }

    @Override
    public List<FingerprintRecord> findAll() {
        return fingerprintrecordRepository.findAll();
    }

    @Override
    public List<FingerprintRecord> findAll(Sort sort){
        return fingerprintrecordRepository.findAll(sort);
    }

    @Override
    public Page<FingerprintRecord> findAll(Pageable pageable){
        return fingerprintrecordRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    fingerprintrecordRepository.deleteById(id);
    }

    @Override
    public void delete(FingerprintRecord fingerprintrecord) {
        fingerprintrecordRepository.delete(fingerprintrecord);
    }

    @Override
    public void deleteAll() {
        fingerprintrecordRepository.deleteAll();
    }

    @Override
    public long count() {
        return fingerprintrecordRepository.count();
    }

}
