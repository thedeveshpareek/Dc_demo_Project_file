package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class AccountTransactionController {

    @Autowired
    private AccountTransactionService accounttransactionService;

    @PostMapping("/accounttransaction")
    public AccountTransaction save(@RequestBody AccountTransaction accounttransaction){
        return accounttransactionService.save(accounttransaction);
    }

    @GetMapping("/accounttransaction/{id}")
    public Optional<AccountTransaction> getById(@PathVariable(value = "id") Long id){
        return accounttransactionService.find(id);
    }

    @GetMapping("/accounttransaction")
    public List<AccountTransaction> getAll(){
        return accounttransactionService.findAll();
    }

    @DeleteMapping("/accounttransaction/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        accounttransactionService.delete(id);
    }

    @DeleteMapping("/accounttransaction")
    public void deleteAll(){
        accounttransactionService.deleteAll();
    }

    @GetMapping("/accounttransaction/count")
    public long count(){
        return accounttransactionService.count();
    }
}