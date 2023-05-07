package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.ExpenseDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.model.ExpenseCategory;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.ExpenseCategoryService;
import com.multipixeltec.dcservice.service.ExpenseService;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class ExpenseController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Value("${application.protocol}")
    private String protocol;
    private ExpenseService expenseService;
    private ExpenseCategoryService expenseCategoryService;
    private AccountService accountService;
    private AccountTransactionService transactionService;
    private final FileService fileService;

    public ExpenseController(ExpenseService expenseService, ExpenseCategoryService expenseCategoryService, AccountService accountService, AccountTransactionService transactionService, FileService fileService) {
        this.expenseService = expenseService;
        this.expenseCategoryService = expenseCategoryService;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.fileService = fileService;
    }

    @PutMapping(value = "/expense",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Expense save(@ModelAttribute ExpenseDto expenseDto, @RequestHeader(HttpHeaders.HOST) String host) {
        Expense expense = new Expense();
        expense.setRefNo(expenseDto.getRefNo());
        expense.setDate(expenseDto.getDate());
        expense.setExpenseFor(expenseDto.getExpenseFor());
        expense.setAmount(expenseDto.getAmount());
        expense.setNote(expenseDto.getNote());
        if (expenseDto.getMainCategoryId() != null) {
            Optional<ExpenseCategory> categoryOptional = expenseCategoryService.find(expenseDto.getMainCategoryId());
            categoryOptional.ifPresent(expenseCategory -> expense.setMainCategory(expenseCategory));
        }
        if (expenseDto.getSubCategoryId() != null) {
            Optional<ExpenseCategory> categoryOptional = expenseCategoryService.find(expenseDto.getSubCategoryId());
            categoryOptional.ifPresent(expenseCategory -> expense.setSubCategory(expenseCategory));
        }
        if (expenseDto.getAttachment() != null && !expenseDto.getAttachment().isEmpty()) {
            String path = protocol + host.concat("/resource/") + fileService.saveFile("expense-attachment", expenseDto.getAttachment());
            expense.setAttachment(path);
        }
        if (expenseDto.getAccountId() != null) {
            Optional<Account> accountOptional = accountService.find(expenseDto.getAccountId());
            accountOptional.ifPresent(account -> expense.setAccount(account));
        }
        Expense save = expenseService.save(expense);

        AccountTransaction transaction = new AccountTransaction();
        transaction.setAccount(save.getAccount());
        transaction.setAmount(save.getAmount());
        transaction.setReferenceNumber(save.getId().toString());
        transaction.setType(TransactionType.DEBIT);
        transaction.setReferenceTo(ReferenceTo.EXPENSE);
        transactionService.save(transaction);
        return save;
    }

    @PostMapping(value = "/expense", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Expense update(@ModelAttribute ExpenseDto expenseDto, @RequestHeader(HttpHeaders.HOST) String host) {
        if (expenseDto.getId() == null || expenseDto.getId() == 0) {
            throw new NotFoundException("Invalid Expense Record! Please Provide Valid ID!.");
        }
        Optional<Expense> optionalExpense = expenseService.find(expenseDto.getId());
        if (!optionalExpense.isPresent()) {
            throw new NotFoundException("Invalid Expense Record! Please Provide Valid ID!.");
        }
        Expense expense = optionalExpense.get();
        expense.setRefNo(expenseDto.getRefNo());
        expense.setDate(expenseDto.getDate());
        expense.setExpenseFor(expenseDto.getExpenseFor());
        expense.setAmount(expenseDto.getAmount());
        expense.setNote(expenseDto.getNote());
        if (expenseDto.getMainCategoryId() != null) {
            Optional<ExpenseCategory> categoryOptional = expenseCategoryService.find(expenseDto.getMainCategoryId());
            categoryOptional.ifPresent(expenseCategory -> expense.setMainCategory(expenseCategory));
        }
        if (expenseDto.getSubCategoryId() != null) {
            Optional<ExpenseCategory> categoryOptional = expenseCategoryService.find(expenseDto.getSubCategoryId());
            categoryOptional.ifPresent(expenseCategory -> expense.setSubCategory(expenseCategory));
        }
        if (expenseDto.getAttachment() != null && !expenseDto.getAttachment().isEmpty()) {
            String path = protocol + host.concat("/resource/") + fileService.saveFile("expense-attachment", expenseDto.getAttachment());
            expense.setAttachment(path);
        }
        if (expenseDto.getAccountId() != null) {
            Optional<Account> accountOptional = accountService.find(expenseDto.getAccountId());
            accountOptional.ifPresent(account -> expense.setAccount(account));
        }
        Expense save = expenseService.save(expense);

        AccountTransaction transaction;
        Optional<AccountTransaction> transactionOptional = transactionService.findByReferenceNumber(expenseDto.getId().toString(),ReferenceTo.EXPENSE);
        if (transactionOptional.isPresent()){
            transaction = transactionOptional.get();
            transaction.setAmount(expense.getAmount());
            transaction.setAccount(expense.getAccount());
        }else {
            transaction = new AccountTransaction();
            transaction.setAccount(expense.getAccount());
            transaction.setAmount(expenseDto.getAmount());
            transaction.setReferenceNumber(save.getId().toString());
            transaction.setType(TransactionType.DEBIT);
            transaction.setReferenceTo(ReferenceTo.EXPENSE);
        }
        transactionService.save(transaction);
        return save;
    }

    @GetMapping("/expense/{id}")
    public Optional<Expense> getById(@PathVariable(value = "id") Long id) {
        return expenseService.find(id);
    }

    @GetMapping("/expense")
    public List<Expense> getAll() {
        return expenseService.findAll();
    }

    @DeleteMapping("/expense/{id}")
    public void deleteById(@PathVariable(value = "id") Long id) {
        expenseService.delete(id);
    }

    @DeleteMapping("/expense")
    public void deleteAll() {
        expenseService.deleteAll();
    }

    @GetMapping("/expense/count")
    public long count() {
        return expenseService.count();
    }

    @PostMapping("/expense/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.expenses(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Expense> patientPage;
        if (page.getText() == null || page.getText().isEmpty()) {
            patientPage = expenseService.findAllByDate(page, pageable);
        } else {
            patientPage = expenseService.findAllByDateAndText(page, pageable);
        }
        page.setData(patientPage.getContent());
        page.setTotal(patientPage.getTotalElements());
        return page;
    }
}
