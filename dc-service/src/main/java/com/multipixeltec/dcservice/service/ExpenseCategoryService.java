package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.ExpenseCategory;
import com.multipixeltec.dcservice.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface ExpenseCategoryService {

    ExpenseCategory save(ExpenseCategory expensecategory);

    Optional<ExpenseCategory> find(Long id);

    List<ExpenseCategory> findAll();

    List<ExpenseCategory> findAll(Sort sort);

    Page<ExpenseCategory> findAll(Pageable pageable);

    void delete(Long id);

    void delete(ExpenseCategory expensecategory);

    void deleteAll();

    long count();

    List<ExpenseCategory> getAllByMainCategory(Long id);

    List<ExpenseCategory> getAllSubCategory();

    List<ExpenseCategory> getAllMainCategory();

}
