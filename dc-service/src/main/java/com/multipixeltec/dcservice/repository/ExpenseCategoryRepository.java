package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

    @Query("FROM ExpenseCategory WHERE main.id=:id")
    List<ExpenseCategory> getAllByMainCategory(Long id);

    @Query("FROM ExpenseCategory WHERE main IS NULL")
    List<ExpenseCategory> getAllMainCategory();

    @Query("FROM ExpenseCategory WHERE main IS NOT NULL")
    List<ExpenseCategory> getAllSubCategory();
}
