package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface ExpenseService {

    Expense save(Expense expense);

    Optional<Expense> find(Long id);

    List<Expense> findAll();

    List<Expense> findAll(Sort sort);

    Page<Expense> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Expense expense);

    void deleteAll();

    long count();

    Page<Expense> findAllByDate(PageDetails page, Pageable pageable);

    Page<Expense> findAllByDateAndText(PageDetails page, Pageable pageable);

    Double totalBetweenDate(PageDetails page);

    Double findTotalByDate(String toString);
}
