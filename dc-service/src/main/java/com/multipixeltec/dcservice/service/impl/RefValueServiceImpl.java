package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.RefValue;
import com.multipixeltec.dcservice.repository.RefValueRepository;
import com.multipixeltec.dcservice.service.RefValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class RefValueServiceImpl implements RefValueService {

    @Autowired
    private RefValueRepository refvalueRepository;

    @Override
    public RefValue save(RefValue refvalue) {
        return refvalueRepository.save(refvalue);
    }

    @Override
    public Optional<RefValue> find(Long id) {
        return refvalueRepository.findById(id);
    }

    @Override
    public List<RefValue> findAll() {
        return refvalueRepository.findAll();
    }

    @Override
    public List<RefValue> findAll(Sort sort){
        return refvalueRepository.findAll(sort);
    }

    @Override
    public Page<RefValue> findAll(Pageable pageable){
        return refvalueRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    refvalueRepository.deleteById(id);
    }

    @Override
    public void delete(RefValue refvalue) {
        refvalueRepository.delete(refvalue);
    }

    @Override
    public void deleteAll() {
        refvalueRepository.deleteAll();
    }

    @Override
    public long count() {
        return refvalueRepository.count();
    }

}
