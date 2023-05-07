package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.AccountTransfer;
import com.multipixeltec.dcservice.repository.AccountTransferRepository;
import com.multipixeltec.dcservice.service.AccountTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class AccountTransferServiceImpl implements AccountTransferService {

    @Autowired
    private AccountTransferRepository accounttransferRepository;

    @Override
    public AccountTransfer save(AccountTransfer accounttransfer) {
        return accounttransferRepository.save(accounttransfer);
    }

    @Override
    public Optional<AccountTransfer> find(Long id) {
        return accounttransferRepository.findById(id);
    }

    @Override
    public List<AccountTransfer> findAll() {
        return accounttransferRepository.findAll();
    }

    @Override
    public List<AccountTransfer> findAll(Sort sort){
        return accounttransferRepository.findAll(sort);
    }

    @Override
    public Page<AccountTransfer> findAll(Pageable pageable){
        return accounttransferRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    accounttransferRepository.deleteById(id);
    }

    @Override
    public void delete(AccountTransfer accounttransfer) {
        accounttransferRepository.delete(accounttransfer);
    }

    @Override
    public void deleteAll() {
        accounttransferRepository.deleteAll();
    }

    @Override
    public long count() {
        return accounttransferRepository.count();
    }

    @Override
    public Page<AccountTransfer> findAllByDate(PageDetails page, Pageable pageable) {
        return accounttransferRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<AccountTransfer> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return accounttransferRepository.findAllByDateAndText(page,pageable);
    }

}
