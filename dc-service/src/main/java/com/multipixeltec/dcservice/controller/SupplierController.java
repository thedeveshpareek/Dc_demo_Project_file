package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.model.Supplier;
import com.multipixeltec.dcservice.service.SupplierService;
import com.multipixeltec.dcservice.util.SortColumn;
import org.springframework.beans.factory.annotation.Autowired;
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
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @PostMapping("/supplier")
    public Supplier save(@RequestBody Supplier supplier){
        return supplierService.save(supplier);
    }

    @GetMapping("/supplier/{id}")
    public Optional<Supplier> getById(@PathVariable(value = "id") Long id){
        return supplierService.find(id);
    }

    @GetMapping("/supplier")
    public List<Supplier> getAll(){
        return supplierService.findAll();
    }

    @DeleteMapping("/supplier/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        supplierService.delete(id);
    }

    @DeleteMapping("/supplier")
    public void deleteAll(){
        supplierService.deleteAll();
    }

    @GetMapping("/supplier/count")
    public long count(){
        return supplierService.count();
    }

    @PostMapping("/supplier/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.supplier(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Supplier> accountsPage;
        if (page.getText()==null || page.getText().isEmpty()){
            accountsPage = supplierService.findAllNative(pageable);
        }else{
            accountsPage = supplierService.findAllByText(page,pageable);
        }
        page.setData(accountsPage.getContent());
        page.setTotal(accountsPage.getTotalElements());
        return page;
    }
}
