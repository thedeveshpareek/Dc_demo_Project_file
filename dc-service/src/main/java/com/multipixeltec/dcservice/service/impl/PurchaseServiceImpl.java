package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Purchase;
import com.multipixeltec.dcservice.repository.PurchaseRepository;
import com.multipixeltec.dcservice.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Override
    public Purchase save(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    @Override
    public Optional<Purchase> find(Long id) {
        return purchaseRepository.findById(id);
    }

    @Override
    public List<Purchase> findAll() {
        return purchaseRepository.findAll();
    }

    @Override
    public List<Purchase> findAll(Sort sort){
        return purchaseRepository.findAll(sort);
    }

    @Override
    public Page<Purchase> findAll(Pageable pageable){
        return purchaseRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    purchaseRepository.deleteById(id);
    }

    @Override
    public void delete(Purchase purchase) {
        purchaseRepository.delete(purchase);
    }

    @Override
    public void deleteAll() {
        purchaseRepository.deleteAll();
    }

    @Override
    public long count() {
        return purchaseRepository.count();
    }

    @Override
    public Page<Purchase> findAllByDate(PageDetails page, Pageable pageable) {
        return purchaseRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<Purchase> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return purchaseRepository.findAllByDateAndText(page,pageable);
    }

    @Override
    public Double totalBetweenDate(PageDetails page) {
        return purchaseRepository.totalBetweenDate(page);
    }

    @Override
    public Double findTotalByDate(String date) {
        return purchaseRepository.findTotalByDate(date);
    }

}
