package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface PurchaseService {

    Purchase save(Purchase purchase);

    Optional<Purchase> find(Long id);

    List<Purchase> findAll();

    List<Purchase> findAll(Sort sort);

    Page<Purchase> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Purchase purchase);

    void deleteAll();

    long count();

    Page<Purchase> findAllByDate(PageDetails page, Pageable pageable);

    Page<Purchase> findAllByDateAndText(PageDetails page, Pageable pageable);

    Double totalBetweenDate(PageDetails page);

    Double findTotalByDate(String date);
}
