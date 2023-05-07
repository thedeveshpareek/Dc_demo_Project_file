package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import com.multipixeltec.dcservice.repository.BillPaymentRepository;
import com.multipixeltec.dcservice.service.BillPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class BillPaymentServiceImpl implements BillPaymentService {

    @Autowired
    private BillPaymentRepository billpaymentRepository;

    @Override
    public BillPayment save(BillPayment billpayment) {
        return billpaymentRepository.save(billpayment);
    }

    @Override
    public Optional<BillPayment> find(Long id) {
        return billpaymentRepository.findById(id);
    }

    @Override
    public List<BillPayment> findAll() {
        return billpaymentRepository.findAll();
    }

    @Override
    public List<BillPayment> findAll(Sort sort){
        return billpaymentRepository.findAll(sort);
    }

    @Override
    public Page<BillPayment> findAll(Pageable pageable){
        return billpaymentRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    billpaymentRepository.deleteById(id);
    }

    @Override
    public void delete(BillPayment billpayment) {
        billpaymentRepository.delete(billpayment);
    }

    @Override
    public void deleteAll() {
        billpaymentRepository.deleteAll();
    }

    @Override
    public long count() {
        return billpaymentRepository.count();
    }

    @Override
    public Page<BillPayment> findAllByDate(PageDetails page, Pageable pageable) {
        return billpaymentRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<BillPayment> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return billpaymentRepository.findAllByDateAndText(page,pageable);
    }

}
