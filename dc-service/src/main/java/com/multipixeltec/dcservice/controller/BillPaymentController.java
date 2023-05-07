package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import com.multipixeltec.dcservice.service.BillPaymentService;
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
public class BillPaymentController {

    @Autowired
    private BillPaymentService billpaymentService;

    @PostMapping("/bill-payment")
    public BillPayment save(@RequestBody BillPayment billpayment){
        return billpaymentService.save(billpayment);
    }

    @GetMapping("/bill-payment/{id}")
    public Optional<BillPayment> getById(@PathVariable(value = "id") Long id){
        return billpaymentService.find(id);
    }

    @GetMapping("/bill-payment")
    public List<BillPayment> getAll(){
        return billpaymentService.findAll();
    }

    @DeleteMapping("/bill-payment/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        billpaymentService.delete(id);
    }

    @DeleteMapping("/bill-payment")
    public void deleteAll(){
        billpaymentService.deleteAll();
    }

    @GetMapping("/bill-payment/count")
    public long count(){
        return billpaymentService.count();
    }

    @PostMapping("/bill-payment/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.billPayment(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<BillPayment> billPage = null;
        if (page.getText() == null || page.getText().isEmpty()) {
            billPage = billpaymentService.findAllByDate(page, pageable);
        } else {
            billPage = billpaymentService.findAllByDateAndText(page, pageable);
        }
        page.setData(billPage.getContent());
        page.setTotal(billPage.getTotalElements());
        return page;
    }
}
