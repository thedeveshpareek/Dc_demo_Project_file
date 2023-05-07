package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class AccountController {

    private AccountService accountService;
    private AccountTransactionService transactionService;

    public AccountController(AccountService accountService, AccountTransactionService transactionService) {
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @PostMapping("/account")
    public Account save(@RequestBody Account account){
        return accountService.save(account);
    }

    @GetMapping("/account/{id}")
    public Optional<Account> getById(@PathVariable(value = "id") Long id){
        return accountService.find(id);
    }

    @GetMapping("/account")
    public List<Account> getAll(){
        return accountService.findAll();
    }

    @DeleteMapping("/account/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        accountService.delete(id);
    }

    @DeleteMapping("/account")
    public void deleteAll(){
        accountService.deleteAll();
    }

    @GetMapping("/account/count")
    public long count(){
        return accountService.count();
    }

    @PostMapping("/account/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), Sort.by("id").descending());
        Page<Account> accountsPage;
        if (page.getText()==null || page.getText().isEmpty()){
            accountsPage = accountService.findAll(pageable);
        }else{
            accountsPage = accountService.findAllByText(page,pageable);
        }
        List<AccountBalance> accountBalances = new ArrayList<>();
        AccountBalance accountBalance;
        for (Account account : accountsPage.getContent()) {
            accountBalance = new AccountBalance();
            accountBalance.setId(account.getId());
            accountBalance.setName(account.getName());
            accountBalance.setDescription(account.getDescription());
            Double credit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.CREDIT);
            Double debit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.DEBIT);
            accountBalance.setCredit(credit==null?0:credit);
            accountBalance.setDebit(debit==null?0:debit);
            accountBalances.add(accountBalance);
        }
        page.setData(accountBalances);
        page.setTotal(accountsPage.getTotalElements());
        return page;
    }

    @GetMapping("/account/balance")
    public List<AccountBalance> getAccountBalance(){
        List<Account> accounts = accountService.findAll();
        List<AccountBalance> accountBalances = new ArrayList<>();
        for (Account account : accounts) {
            AccountBalance accountBalance = new AccountBalance();
            accountBalance.setId(account.getId());
            accountBalance.setName(account.getName());
            accountBalance.setDescription(account.getDescription());
            Double credit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.CREDIT);
            Double debit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.DEBIT);
            accountBalance.setCredit(credit==null?0:credit);
            accountBalance.setDebit(debit==null?0:debit);
            accountBalances.add(accountBalance);
        }
        return accountBalances;
    }

}
