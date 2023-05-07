package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.repository.AccountRepository;
import com.multipixeltec.dcservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Optional<Account> find(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public List<Account> findAll(Sort sort){
        return accountRepository.findAll(sort);
    }

    @Override
    public Page<Account> findAll(Pageable pageable){
        return accountRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    accountRepository.deleteById(id);
    }

    @Override
    public void delete(Account account) {
        accountRepository.delete(account);
    }

    @Override
    public void deleteAll() {
        accountRepository.deleteAll();
    }

    @Override
    public long count() {
        return accountRepository.count();
    }

    @Override
    public Page<Account> findAllByText(PageDetails page, Pageable pageable) {
        return accountRepository.findAll(page,pageable);
    }

    @Override
    public List<AccountBalance> getAccountBalance() {
        return accountRepository.getAccountBalance();
    }

}
