package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface SupplierService {

    Supplier save(Supplier supplier);

    Optional<Supplier> find(Long id);

    List<Supplier> findAll();

    List<Supplier> findAll(Sort sort);

    Page<Supplier> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Supplier supplier);

    void deleteAll();

    long count();

    Page<Supplier> findAllByText(PageDetails page, Pageable pageable);

    Page<Supplier> findAllNative(Pageable pageable);
}
