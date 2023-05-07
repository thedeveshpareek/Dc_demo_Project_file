package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface BillPaymentService {

    BillPayment save(BillPayment billpayment);

    Optional<BillPayment> find(Long id);

    List<BillPayment> findAll();

    List<BillPayment> findAll(Sort sort);

    Page<BillPayment> findAll(Pageable pageable);

    void delete(Long id);

    void delete(BillPayment billpayment);

    void deleteAll();

    long count();

    Page<BillPayment> findAllByDate(PageDetails page, Pageable pageable);

    Page<BillPayment> findAllByDateAndText(PageDetails page, Pageable pageable);
}
