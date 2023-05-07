package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.*;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.AccountTransferService;
import com.multipixeltec.dcservice.util.SortColumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class AccountTransferController {

    @Autowired
    private AccountTransferService accounttransferService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountTransactionService transactionService;

    @PostMapping("/account-transfer")
    public AccountTransfer save(@RequestBody AccountTransfer accounttransfer){
        if (accounttransfer.getFromId() != null) {
            Optional<Account> accountOptional = accountService.find(accounttransfer.getFromId());
            accountOptional.ifPresent(account -> accounttransfer.setFrom(account));
        }
        if (accounttransfer.getToId() != null) {
            Optional<Account> accountOptional = accountService.find(accounttransfer.getToId());
            accountOptional.ifPresent(account -> accounttransfer.setTo(account));
        }
        AccountTransfer accountTransfer = accounttransferService.save(accounttransfer);
        if (accounttransfer.getId() == null){
            AccountTransaction debitTransaction = new AccountTransaction();
            debitTransaction.setAccount(accounttransfer.getFrom());
            debitTransaction.setAmount(accounttransfer.getAmount());
            debitTransaction.setReferenceNumber(accountTransfer.getId().toString());
            debitTransaction.setType(TransactionType.DEBIT);
            debitTransaction.setReferenceTo(ReferenceTo.ACCOUNT_TRANSFER);
            transactionService.save(debitTransaction);

            AccountTransaction creditTransaction = new AccountTransaction();
            creditTransaction.setAccount(accounttransfer.getTo());
            creditTransaction.setAmount(accounttransfer.getAmount());
            creditTransaction.setReferenceNumber(accountTransfer.getId().toString());
            creditTransaction.setType(TransactionType.CREDIT);
            creditTransaction.setReferenceTo(ReferenceTo.ACCOUNT_TRANSFER);
            transactionService.save(creditTransaction);
        }else{
            Optional<AccountTransaction> debitTrans = transactionService.findByReferenceNumberAndType(accountTransfer.getId().toString(),TransactionType.DEBIT);
            if (debitTrans.isPresent()){
                AccountTransaction transaction = debitTrans.get();
                transaction.setAmount(accounttransfer.getAmount());
                transaction.setAccount(accountTransfer.getFrom());
                transactionService.save(transaction);
            }
            Optional<AccountTransaction> creditTrans = transactionService.findByReferenceNumberAndType(accountTransfer.getId().toString(),TransactionType.CREDIT);
            if (creditTrans.isPresent()){
                AccountTransaction transaction = debitTrans.get();
                transaction.setAmount(accounttransfer.getAmount());
                transaction.setAccount(accountTransfer.getTo());
                transactionService.save(transaction);
            }
        }
        return accountTransfer;
    }

    @GetMapping("/account-transfer/{id}")
    public Optional<AccountTransfer> getById(@PathVariable(value = "id") Long id){
        return accounttransferService.find(id);
    }

    @GetMapping("/account-transfer")
    public List<AccountTransfer> getAll(){
        return accounttransferService.findAll();
    }

    @DeleteMapping("/account-transfer/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        accounttransferService.delete(id);
    }

    @DeleteMapping("/account-transfer")
    public void deleteAll(){
        accounttransferService.deleteAll();
    }

    @GetMapping("/account-transfer/count")
    public long count(){
        return accounttransferService.count();
    }

    @PostMapping("/account-transfer/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.accountTransfer(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<AccountTransfer> billPage = null;
        if (page.getText() == null || page.getText().isEmpty()) {
            billPage = accounttransferService.findAllByDate(page, pageable);
        } else {
            billPage = accounttransferService.findAllByDateAndText(page, pageable);
        }
        page.setData(billPage.getContent());
        page.setTotal(billPage.getTotalElements());
        return page;
    }
}
