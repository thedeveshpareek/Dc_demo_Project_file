package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.ExpenseCategory;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService expensecategoryService;

    @PostMapping("/expense-category")
    public ExpenseCategory save(@RequestBody ExpenseCategory expensecategory){
        if (expensecategory.getMainId()!=null){
            Optional<ExpenseCategory> mainCategoryOptional = expensecategoryService.find(expensecategory.getMainId());
            mainCategoryOptional.ifPresent(mainCategory -> expensecategory.setMain(mainCategory));
        }
        return expensecategoryService.save(expensecategory);
    }

    @GetMapping("/expense-category/{id}")
    public Optional<ExpenseCategory> getById(@PathVariable(value = "id") Long id){
        return expensecategoryService.find(id);
    }

    @GetMapping("/expense-category")
    public List<ExpenseCategory> getAll(){
        return expensecategoryService.findAll();
    }

    @DeleteMapping("/expense-category/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        expensecategoryService.delete(id);
    }

    @DeleteMapping("/expense-category")
    public void deleteAll(){
        expensecategoryService.deleteAll();
    }

    @GetMapping("/expense-category/count")
    public long count(){
        return expensecategoryService.count();
    }

    @GetMapping("/expense-category/{id}/sub")
    public List<ExpenseCategory> getAllByMainCategory(@PathVariable(value = "id") Long id){
        return expensecategoryService.getAllByMainCategory(id);
    }

    @GetMapping("/expense-category/sub")
    public List<ExpenseCategory> getAllSubCategory(){
        return expensecategoryService.getAllSubCategory();
    }

    @GetMapping("/expense-category/main")
    public List<ExpenseCategory> getAllMainCategory(){
        return expensecategoryService.getAllMainCategory();
    }


}
