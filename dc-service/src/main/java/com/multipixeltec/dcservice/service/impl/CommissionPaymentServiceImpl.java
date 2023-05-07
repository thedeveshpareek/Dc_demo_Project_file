package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.CommissionPayment;
import com.multipixeltec.dcservice.repository.CommissionPaymentRepository;
import com.multipixeltec.dcservice.service.CommissionPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class CommissionPaymentServiceImpl implements CommissionPaymentService {

    @Autowired
    private CommissionPaymentRepository commissionpaymentRepository;

    @Override
    public CommissionPayment save(CommissionPayment commissionpayment) {
        return commissionpaymentRepository.save(commissionpayment);
    }

    @Override
    public Optional<CommissionPayment> find(Long id) {
        return commissionpaymentRepository.findById(id);
    }

    @Override
    public List<CommissionPayment> findAll() {
        return commissionpaymentRepository.findAll();
    }

    @Override
    public List<CommissionPayment> findAll(Sort sort){
        return commissionpaymentRepository.findAll(sort);
    }

    @Override
    public Page<CommissionPayment> findAll(Pageable pageable){
        return commissionpaymentRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    commissionpaymentRepository.deleteById(id);
    }

    @Override
    public void delete(CommissionPayment commissionpayment) {
        commissionpaymentRepository.delete(commissionpayment);
    }

    @Override
    public void deleteAll() {
        commissionpaymentRepository.deleteAll();
    }

    @Override
    public long count() {
        return commissionpaymentRepository.count();
    }

}
