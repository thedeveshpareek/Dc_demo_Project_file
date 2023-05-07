package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.PurchaseDto;
import com.multipixeltec.dcservice.enums.PurchaseStatus;
import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.model.Purchase;
import com.multipixeltec.dcservice.model.Supplier;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.PurchaseService;
import com.multipixeltec.dcservice.service.SupplierService;
import com.multipixeltec.dcservice.util.FileService;
import com.multipixeltec.dcservice.util.SortColumn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class PurchaseController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${application.protocol}")
    private String protocol;
    private PurchaseService purchaseService;
    private SupplierService supplierService;
    private AccountService accountService;
    private AccountTransactionService transactionService;
    private final FileService fileService;

    public PurchaseController(PurchaseService purchaseService, SupplierService supplierService, AccountService accountService, AccountTransactionService transactionService, FileService fileService) {
        this.purchaseService = purchaseService;
        this.supplierService = supplierService;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.fileService = fileService;
    }

    @PutMapping(value = "/purchase",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Purchase save(@ModelAttribute PurchaseDto purchaseDto, @RequestHeader(HttpHeaders.HOST) String host){
        Purchase purchase = new Purchase();
        purchase.setId(purchaseDto.getId());
        purchase.setRefNo(purchaseDto.getRefNo());
        purchase.setPurchaseDate(purchaseDto.getPurchaseDate());
        purchase.setStatus(PurchaseStatus.valueOf(purchaseDto.getStatus()));
        purchase.setAmount(purchaseDto.getAmount());
        purchase.setNote(purchaseDto.getNote());
        if (purchaseDto.getSupplierId()!=null){
            Optional<Supplier> optionalSupplier = supplierService.find(purchaseDto.getSupplierId());
            optionalSupplier.ifPresent(supplier -> purchase.setSupplier(supplier));
        }
        if (purchaseDto.getAttachment()!=null && !purchaseDto.getAttachment().isEmpty()){
            String path = protocol+host.concat("/resource/")+fileService.saveFile("purchase-attachment",purchaseDto.getAttachment());
            purchase.setAttachment(path);
        }
        if (purchaseDto.getAccountId() != null) {
            Optional<Account> accountOptional = accountService.find(purchaseDto.getAccountId());
            accountOptional.ifPresent(account -> purchase.setAccount(account));
        }
        Purchase save = purchaseService.save(purchase);

        AccountTransaction transaction = new AccountTransaction();
        transaction.setAccount(save.getAccount());
        transaction.setAmount(save.getAmount());
        transaction.setReferenceNumber(save.getId().toString());
        transaction.setType(TransactionType.DEBIT);
        transaction.setReferenceTo(ReferenceTo.PURCHASE);
        transactionService.save(transaction);
        return save;
    }

    @PostMapping(value = "/purchase",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Purchase update(@ModelAttribute PurchaseDto purchaseDto, @RequestHeader(HttpHeaders.HOST) String host){
        if (purchaseDto.getId() != null){
            Optional<Purchase> optionalPurchase = purchaseService.find(purchaseDto.getId());
            if (optionalPurchase.isPresent()) {
                Purchase purchase = optionalPurchase.get();
                purchase.setRefNo(purchaseDto.getRefNo());
                purchase.setPurchaseDate(purchaseDto.getPurchaseDate());
                purchase.setStatus(PurchaseStatus.valueOf(purchaseDto.getStatus()));
                purchase.setAmount(purchaseDto.getAmount());
                purchase.setNote(purchaseDto.getNote());
                if (purchaseDto.getSupplierId()!=null){
                    Optional<Supplier> optionalSupplier = supplierService.find(purchaseDto.getSupplierId());
                    optionalSupplier.ifPresent(supplier -> purchase.setSupplier(supplier));
                }
                if (purchaseDto.getAttachment()!=null && !purchaseDto.getAttachment().isEmpty()){
                    String path = protocol+host.concat("/resource/")+fileService.saveFile("purchase-attachment",purchaseDto.getAttachment());
                    purchase.setAttachment(path);
                }
                if (purchaseDto.getAccountId() != null) {
                    Optional<Account> accountOptional = accountService.find(purchaseDto.getAccountId());
                    accountOptional.ifPresent(account -> purchase.setAccount(account));
                }
                Purchase save = purchaseService.save(purchase);

                AccountTransaction transaction;
                Optional<AccountTransaction> transactionOptional = transactionService.findByReferenceNumber(purchaseDto.getId().toString(),ReferenceTo.PURCHASE);
                if (transactionOptional.isPresent()){
                    transaction = transactionOptional.get();
                    transaction.setAmount(purchase.getAmount());
                    transaction.setAccount(purchase.getAccount());
                }else {
                    transaction = new AccountTransaction();
                    transaction.setAccount(purchase.getAccount());
                    transaction.setAmount(purchase.getAmount());
                    transaction.setReferenceNumber(save.getId().toString());
                    transaction.setType(TransactionType.DEBIT);
                    transaction.setReferenceTo(ReferenceTo.PURCHASE);
                }
                transactionService.save(transaction);
                return save;
            }
        }
        throw new NotFoundException("Invalid Purchase Record! Please Provide Valid ID!.");
    }

    @GetMapping("/purchase/{id}")
    public Optional<Purchase> getById(@PathVariable(value = "id") Long id){
        return purchaseService.find(id);
    }

    @GetMapping("/purchase")
    public List<Purchase> getAll(){
        return purchaseService.findAll();
    }

    @DeleteMapping("/purchase/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        purchaseService.delete(id);
    }

    @DeleteMapping("/purchase")
    public void deleteAll(){
        purchaseService.deleteAll();
    }

    @GetMapping("/purchase/count")
    public long count(){
        return purchaseService.count();
    }

    @PostMapping("/purchase/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.purchase(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Purchase> patientPage;
        if (page.getText()==null || page.getText().isEmpty()){
            patientPage = purchaseService.findAllByDate(page,pageable);
        }else{
            patientPage = purchaseService.findAllByDateAndText(page, pageable);
        }
        page.setData(patientPage.getContent());
        page.setTotal(patientPage.getTotalElements());
        return page;
    }
}
