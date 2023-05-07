package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Supplier;
import com.multipixeltec.dcservice.repository.SupplierRepository;
import com.multipixeltec.dcservice.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier save(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public Optional<Supplier> find(Long id) {
        return supplierRepository.findById(id);
    }

    @Override
    public List<Supplier> findAll() {
        return supplierRepository.findAll();
    }

    @Override
    public List<Supplier> findAll(Sort sort){
        return supplierRepository.findAll(sort);
    }

    @Override
    public Page<Supplier> findAll(Pageable pageable){
        return supplierRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    supplierRepository.deleteById(id);
    }

    @Override
    public void delete(Supplier supplier) {
        supplierRepository.delete(supplier);
    }

    @Override
    public void deleteAll() {
        supplierRepository.deleteAll();
    }

    @Override
    public long count() {
        return supplierRepository.count();
    }

    @Override
    public Page<Supplier> findAllByText(PageDetails page, Pageable pageable) {
        return supplierRepository.findAllByText(page,pageable);
    }

    @Override
    public Page<Supplier> findAllNative(Pageable pageable) {
        return supplierRepository.findAllNative(pageable);
    }

}
