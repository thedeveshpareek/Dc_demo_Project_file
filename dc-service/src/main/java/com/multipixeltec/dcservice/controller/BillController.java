package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.BillDto;
import com.multipixeltec.dcservice.dto.BillPaymentDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.*;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.*;
import com.multipixeltec.dcservice.service.*;
import com.multipixeltec.dcservice.util.SortColumn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1")
public class BillController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private BillService billService;
    private BillPaymentService billPaymentService;
    private CommissionService commissionService;
    private PatientService patientService;
    private AccountService accountService;
    private AccountTransactionService transactionService;

    private TestOrPackageService testOrPackageService;

    public BillController(BillService billService, BillPaymentService billPaymentService, CommissionService commissionService, PatientService patientService, AccountService accountService, AccountTransactionService transactionService, TestOrPackageService testOrPackageService) {
        this.billService = billService;
        this.billPaymentService = billPaymentService;
        this.commissionService = commissionService;
        this.patientService = patientService;
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.testOrPackageService = testOrPackageService;
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    @PutMapping("/bill")
    public Bill save(@RequestBody BillDto billDto) {
        logger.info(billDto.toString());
        if (billDto.getPatientId() != null && billDto.getTestId() != null){
            Optional<Patient> optionalPatient = patientService.find(billDto.getPatientId());
            if (optionalPatient.isPresent()){
                Patient patient = optionalPatient.get();
                AgentOrAgency agentOrAgency = patient.getAgentOrAgency();
                Optional<TestOrPackage> optionalTest = testOrPackageService.find(billDto.getTestId());
                double billAmount = billDto.getAmount();
                double commissionAmount = 0.0;

                if (agentOrAgency != null){
                    if (agentOrAgency.getCommissionRate()!= null && agentOrAgency.getCommissionRate() > 0){
                        commissionAmount = billAmount*agentOrAgency.getCommissionRate()/100;
                    }else{
                        commissionAmount = billAmount - agentOrAgency.getCommissionAmount();
                    }
                }

                Bill bill = new Bill();
                bill.setPatient(patient);
                optionalTest.ifPresent(testOrPackage -> bill.setTest(testOrPackage));
                if (agentOrAgency!=null){
                    bill.setAgent(agentOrAgency);
                }
                bill.setAmount(billAmount);
                bill.setPaid(0.0);
                bill.setCommission(commissionAmount);
                bill.setStatus(BillStatus.GENERATED);
                Bill savedBill = billService.save(bill);
                if (commissionAmount>0){
                    Commission commission = new Commission();
                    commission.setBill(savedBill);
                    commission.setAmount(commissionAmount);
                    commission.setPaid(0.0);
                    commission.setDue(commissionAmount);
                    commission.setStatus(CommissionStatus.PAYMENT_DUE);
                    commission.setAgentOrAgency(agentOrAgency);
                    commissionService.save(commission);
                }
                return savedBill;
            }
        }
        throw new NotFoundException("Patient Or Test Not Found!");
    }

    @GetMapping("/bill/{id}")
    public Optional<Bill> getById(@PathVariable(value = "id") Long id) {
        return billService.find(id);
    }

    @GetMapping("/bill")
    public List<Bill> getAll() {
        return billService.findAll();
    }

    @DeleteMapping("/bill/{id}")
    public void deleteById(@PathVariable(value = "id") Long id) {
        billService.delete(id);
    }

    @DeleteMapping("/bill")
    public void deleteAll() {
        billService.deleteAll();
    }

    @GetMapping("/bill/count")
    public long count() {
        return billService.count();
    }

    @PostMapping("/bill/advanced")
    public PageDetails advanced(@RequestBody PageDetails page) {
        Sort sort = SortColumn.bill(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Bill> billPage = null;
        if (page.getText() == null || page.getText().isEmpty()) {
            billPage = billService.findAllByDate(page, pageable);
        } else {
            billPage = billService.findAllByDateAndText(page, pageable);
        }
        page.setData(billPage.getContent());
        page.setTotal(billPage.getTotalElements());
        return page;
    }

    @PostMapping("/bill/advanced/agency")
    public PageDetails advancedAgency(@RequestBody PageDetails page) {
        String type = AgentAgency.AGENCY.name();
        Sort sort = SortColumn.bill(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Bill> billPage = null;
        if (page.getText() == null || page.getText().isEmpty()) {
            billPage = billService.findAllByAgentTypeAndDate(type,page, pageable);
        } else {
            billPage = billService.findAllByAgentTypeAndDateAndText(type,page, pageable);
        }
        page.setData(billPage.getContent());
        page.setTotal(billPage.getTotalElements());
        return page;
    }

    @PostMapping("/bill/advanced/agent")
    public PageDetails advancedAgent(@RequestBody PageDetails page) {
        String type = AgentAgency.AGENT.name();
        Sort sort = SortColumn.bill(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Bill> billPage = null;
        if (page.getText() == null || page.getText().isEmpty()) {
            billPage = billService.findAllByAgentTypeAndDate(type,page, pageable);
        } else {
            billPage = billService.findAllByAgentTypeAndDateAndText(type,page, pageable);
        }
        page.setData(billPage.getContent());
        page.setTotal(billPage.getTotalElements());
        return page;
    }

    @GetMapping("/bill/{id}/patient")
    public List<Bill> getAllByPatient(@PathVariable(value = "id") Long id) {
        return billService.findAllByPatient(id);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    @PostMapping("/bill/{id}/pay")
    public Bill payBill(@RequestBody BillPaymentDto paymentDto) {
        Optional<Bill> optionalBill = billService.find(paymentDto.getBillId());
        if (optionalBill.isPresent()) {
            Bill bill = optionalBill.get();

            Optional<Account> accountOptional = accountService.find(paymentDto.getAccountId());
            BillPayment payment = new BillPayment();
            accountOptional.ifPresent(account -> payment.setAccount(account));
            payment.setBill(bill);
            payment.setAmount(paymentDto.getAmount());
            payment.setStatus(PaymentStatus.PAID);
            billPaymentService.save(payment);
            bill.addPayment(payment.getAmount());
            billService.save(bill);

            AccountTransaction transaction = new AccountTransaction();
            transaction.setAccount(payment.getAccount());
            transaction.setAmount(paymentDto.getAmount());
            transaction.setReferenceNumber(bill.getId().toString());
            transaction.setType(TransactionType.CREDIT);
            transaction.setReferenceTo(ReferenceTo.BILL);
            transactionService.save(transaction);


            CommissionStatus commissionStatus;
            if (bill.getStatus() == BillStatus.PAID){
                commissionStatus = CommissionStatus.CLIENT_FULLY_PAID;
            }else if (bill.getStatus() == BillStatus.PARTIALLY_PAID){
                commissionStatus = CommissionStatus.CLIENT_PARTIALLY_PAID;
            }else {
                commissionStatus = CommissionStatus.PAYMENT_DUE;
            }
            Set<Commission> commissions = bill.getCommissions();
            for (Commission commission : commissions) {
                commission.setStatus(commissionStatus);
            }
            commissionService.saveAll(commissions.stream().collect(Collectors.toList()));
            return bill;
        } else {
            throw new NotFoundException("Bill Not Found!");
        }
    }
}
