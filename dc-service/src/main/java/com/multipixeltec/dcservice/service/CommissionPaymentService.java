package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.CommissionPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface CommissionPaymentService {

    CommissionPayment save(CommissionPayment commissionpayment);

    Optional<CommissionPayment> find(Long id);

    List<CommissionPayment> findAll();

    List<CommissionPayment> findAll(Sort sort);

    Page<CommissionPayment> findAll(Pageable pageable);

    void delete(Long id);

    void delete(CommissionPayment commissionpayment);

    void deleteAll();

    long count();

}