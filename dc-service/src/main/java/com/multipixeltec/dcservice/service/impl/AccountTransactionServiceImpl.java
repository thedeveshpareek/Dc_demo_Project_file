package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.repository.AccountTransactionRepository;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class AccountTransactionServiceImpl implements AccountTransactionService {

    @Autowired
    private AccountTransactionRepository accounttransactionRepository;

    @Override
    public AccountTransaction save(AccountTransaction accounttransaction) {
        return accounttransactionRepository.save(accounttransaction);
    }

    @Override
    public Optional<AccountTransaction> find(Long id) {
        return accounttransactionRepository.findById(id);
    }

    @Override
    public List<AccountTransaction> findAll() {
        return accounttransactionRepository.findAll();
    }

    @Override
    public List<AccountTransaction> findAll(Sort sort){
        return accounttransactionRepository.findAll(sort);
    }

    @Override
    public Page<AccountTransaction> findAll(Pageable pageable){
        return accounttransactionRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    accounttransactionRepository.deleteById(id);
    }

    @Override
    public void delete(AccountTransaction accounttransaction) {
        accounttransactionRepository.delete(accounttransaction);
    }

    @Override
    public void deleteAll() {
        accounttransactionRepository.deleteAll();
    }

    @Override
    public long count() {
        return accounttransactionRepository.count();
    }

    @Override
    public Optional<AccountTransaction> findByReferenceNumber(String referenceNumber,ReferenceTo referenceTo) {
        return accounttransactionRepository.findByReferenceNumber(referenceNumber, referenceTo);
    }

    @Override
    public Double findSumByAccountAndType(Long accountId, TransactionType type) {
        return accounttransactionRepository.findSumByAccountAndType(accountId, type);
    }

    @Override
    public Optional<AccountTransaction> findByReferenceNumberAndType(String id, TransactionType type) {
        return accounttransactionRepository.findByReferenceNumberAndType(id, type);
    }

}
