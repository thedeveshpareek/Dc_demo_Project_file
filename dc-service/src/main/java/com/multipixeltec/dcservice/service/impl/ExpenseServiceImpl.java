package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.repository.ExpenseRepository;
import com.multipixeltec.dcservice.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense save(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public Optional<Expense> find(Long id) {
        return expenseRepository.findById(id);
    }

    @Override
    public List<Expense> findAll() {
        return expenseRepository.findAll();
    }

    @Override
    public List<Expense> findAll(Sort sort){
        return expenseRepository.findAll(sort);
    }

    @Override
    public Page<Expense> findAll(Pageable pageable){
        return expenseRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    expenseRepository.deleteById(id);
    }

    @Override
    public void delete(Expense expense) {
        expenseRepository.delete(expense);
    }

    @Override
    public void deleteAll() {
        expenseRepository.deleteAll();
    }

    @Override
    public long count() {
        return expenseRepository.count();
    }

    @Override
    public Page<Expense> findAllByDate(PageDetails page, Pageable pageable) {
        return expenseRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<Expense> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return expenseRepository.findAllByDateAndText(page,pageable);
    }

    @Override
    public Double totalBetweenDate(PageDetails page) {
        return expenseRepository.totalBetweenDate(page);
    }

    @Override
    public Double findTotalByDate(String date) {
        return expenseRepository.findTotalByDate(date);
    }

}
