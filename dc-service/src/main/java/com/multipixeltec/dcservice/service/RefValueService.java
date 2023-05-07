package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.RefValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface RefValueService {

    RefValue save(RefValue refvalue);

    Optional<RefValue> find(Long id);

    List<RefValue> findAll();

    List<RefValue> findAll(Sort sort);

    Page<RefValue> findAll(Pageable pageable);

    void delete(Long id);

    void delete(RefValue refvalue);

    void deleteAll();

    long count();

}