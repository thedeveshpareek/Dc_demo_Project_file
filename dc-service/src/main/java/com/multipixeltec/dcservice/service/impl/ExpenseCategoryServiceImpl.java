package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.ExpenseCategory;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.repository.ExpenseCategoryRepository;
import com.multipixeltec.dcservice.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseCategoryServiceImpl implements ExpenseCategoryService {

    @Autowired
    private ExpenseCategoryRepository expensecategoryRepository;

    @Override
    public ExpenseCategory save(ExpenseCategory expensecategory) {
        return expensecategoryRepository.save(expensecategory);
    }

    @Override
    public Optional<ExpenseCategory> find(Long id) {
        return expensecategoryRepository.findById(id);
    }

    @Override
    public List<ExpenseCategory> findAll() {
        return expensecategoryRepository.findAll();
    }

    @Override
    public List<ExpenseCategory> findAll(Sort sort){
        return expensecategoryRepository.findAll(sort);
    }

    @Override
    public Page<ExpenseCategory> findAll(Pageable pageable){
        return expensecategoryRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    expensecategoryRepository.deleteById(id);
    }

    @Override
    public void delete(ExpenseCategory expensecategory) {
        expensecategoryRepository.delete(expensecategory);
    }

    @Override
    public void deleteAll() {
        expensecategoryRepository.deleteAll();
    }

    @Override
    public long count() {
        return expensecategoryRepository.count();
    }

    @Override
    public List<ExpenseCategory> getAllByMainCategory(Long id) {
        return expensecategoryRepository.getAllByMainCategory(id);
    }

    @Override
    public List<ExpenseCategory> getAllSubCategory() {
        return expensecategoryRepository.getAllSubCategory();
    }

    @Override
    public List<ExpenseCategory> getAllMainCategory() {
        return expensecategoryRepository.getAllMainCategory();
    }


}
