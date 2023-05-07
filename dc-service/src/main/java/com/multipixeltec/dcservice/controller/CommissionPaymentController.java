package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.model.CommissionPayment;
import com.multipixeltec.dcservice.service.CommissionPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class CommissionPaymentController {

    @Autowired
    private CommissionPaymentService commissionpaymentService;

    @PostMapping("/commission-payment")
    public CommissionPayment save(@RequestBody CommissionPayment commissionpayment){
        return commissionpaymentService.save(commissionpayment);
    }

    @GetMapping("/commission-payment/{id}")
    public Optional<CommissionPayment> getById(@PathVariable(value = "id") Long id){
        return commissionpaymentService.find(id);
    }

    @GetMapping("/commission-payment")
    public List<CommissionPayment> getAll(){
        return commissionpaymentService.findAll();
    }

    @DeleteMapping("/commission-payment/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        commissionpaymentService.delete(id);
    }

    @DeleteMapping("/commission-payment")
    public void deleteAll(){
        commissionpaymentService.deleteAll();
    }

    @GetMapping("/commission-payment/count")
    public long count(){
        return commissionpaymentService.count();
    }
}
