package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.DashboardMetricsDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Copyright (C) 2022 PIXOUS INNOVATIONS - All Rights Reserved
 * You may use, distribute and modify this code under the terms of the XYZ license,
 * which unfortunately won't be written for another century.
 * Project   : dc-service
 * Date      : 2023-01-08
 * Developer : priyamal
 */
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/v1")
public class DashboardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final BillService billService;
    private final BillPaymentService billPaymentService;
    private final DiagnosticReportService diagnosticReportService;
    private final PurchaseService purchaseService;
    private final ExpenseService expenseService;
    private final CommissionService commissionService;
    private final PatientReportService patientReportService;
    private final AccountService accountService;
    private final AccountTransactionService transactionService;

    public DashboardController(BillService billService, BillPaymentService billPaymentService, DiagnosticReportService diagnosticReportService, PurchaseService purchaseService, ExpenseService expenseService, CommissionService commissionService, PatientReportService patientReportService, AccountService accountService, AccountTransactionService transactionService) {
        this.billService = billService;
        this.billPaymentService = billPaymentService;
        this.diagnosticReportService = diagnosticReportService;
        this.purchaseService = purchaseService;
        this.expenseService = expenseService;
        this.commissionService = commissionService;
        this.patientReportService = patientReportService;
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @PostMapping("/dashboard/metrics-between-date")
    public DashboardMetricsDto getMetricsBetweenDates(@RequestBody PageDetails page) {
        logger.info(page.toString());
        DashboardMetricsDto metrics = new DashboardMetricsDto();
        Double total = billService.findBillAmountByDate(page);
        Long totalTest = patientReportService.countBetweenDate(page);
        Long completedTest = patientReportService.completedCountBetweenDate(page);
        Long pendingTest = patientReportService.pendingCountBetweenDate(page);
        Double purchaseTotal = purchaseService.totalBetweenDate(page);
        Double expenseTotal = expenseService.totalBetweenDate(page);
        Double agentCommission = commissionService.totalBetweenDateAndType(AgentAgency.AGENT.name(), page);
        Double agencyCommission = commissionService.totalBetweenDateAndType(AgentAgency.AGENCY.name(), page);

        LocalDate startDate = LocalDate.parse(page.getFrom());
        LocalDate endDate = LocalDate.parse(page.getTo());
        endDate = endDate.plusDays(1);

        List<Double> setA = new ArrayList<>();
        List<Double> setB = new ArrayList<>();
        List<Double> setC = new ArrayList<>();
        Double billTotalPerDay = 0.0,purchasePerDay = 0.0,expensesPerDay = 0.0;
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
            billTotalPerDay = 0.0;
            purchasePerDay = 0.0;
            expensesPerDay = 0.0;
            logger.info("----------"+date.toString());
            metrics.getLabels().add(date.toString());
            billTotalPerDay = billService.findBillTotalByDate(date.toString());
            setA.add(billTotalPerDay == null ? 0.0 : billTotalPerDay);
            purchasePerDay = purchaseService.findTotalByDate(date.toString());
            setB.add(purchasePerDay == null ? 0.0 : purchasePerDay);
            expensesPerDay = expenseService.findTotalByDate(date.toString());
            setC.add(expensesPerDay == null ? 0.0 : expensesPerDay);
        }
        metrics.getData().add(setA);
        metrics.getData().add(setB);
        metrics.getData().add(setC);

        metrics.setTotalBillAmount(total == null ? 0.0 : total);
        metrics.setTotalTestCount(totalTest == null ? 0 : totalTest);
        metrics.setTotalTestCompleted(completedTest == null ? 0 : completedTest);
        metrics.setTotalTestPending(pendingTest == null ? 0 : pendingTest);
        metrics.setTotalPurchase(purchaseTotal == null ? 0.0 : purchaseTotal);
        metrics.setTotalExpenses(expenseTotal == null ? 0.0 : expenseTotal);
        metrics.setTotalAgentCommissions(agentCommission == null ? 0.0 : agentCommission);
        metrics.setTotalAgencyCommissions(agencyCommission == null ? 0.0 : agencyCommission);

        List<Account> accounts = accountService.findAll();
        List<AccountBalance> accountBalances = new ArrayList<>();
        for (Account account : accounts) {
            AccountBalance accountBalance = new AccountBalance();
            accountBalance.setId(account.getId());
            accountBalance.setName(account.getName());
            accountBalance.setDescription(account.getDescription());
            Double credit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.CREDIT);
            Double debit  = transactionService.findSumByAccountAndType(account.getId(), TransactionType.DEBIT);
            accountBalance.setCredit(credit==null?0:credit);
            accountBalance.setDebit(debit==null?0:debit);
            accountBalances.add(accountBalance);
        }
        metrics.setAccountBalances(accountBalances);
        return metrics;
    }

    @PostMapping("/dashboard/cashier-summaries")
    public DashboardMetricsDto getCashierSummeryBetweenDates(@RequestBody PageDetails page) {
        logger.info(page.toString());
        String from = page.getFrom();
        String to = page.getTo();

        //billService.findAllByDate(startDate.toString(),endDate.toString());


        return null;
    }
}
