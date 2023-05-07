package com.multipixeltec.dcservice.controller;

import com.multipixeltec.dcservice.dto.CommissionSummeryDto;
import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.dto.PayAllDto;
import com.multipixeltec.dcservice.enums.CommissionStatus;
import com.multipixeltec.dcservice.enums.PaymentStatus;
import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.exceptions.NotFoundException;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountTransaction;
import com.multipixeltec.dcservice.model.Commission;
import com.multipixeltec.dcservice.model.CommissionPayment;
import com.multipixeltec.dcservice.service.AccountService;
import com.multipixeltec.dcservice.service.AccountTransactionService;
import com.multipixeltec.dcservice.service.CommissionPaymentService;
import com.multipixeltec.dcservice.service.CommissionService;
import com.multipixeltec.dcservice.util.SortColumn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1")
public class CommissionController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final CommissionService commissionService;

    private final CommissionPaymentService commissionPaymentService;
    private final AccountService accountService;
    private final AccountTransactionService transactionService;

    public CommissionController(CommissionService commissionService, CommissionPaymentService commissionPaymentService, AccountService accountService, AccountTransactionService transactionService) {
        this.commissionService = commissionService;
        this.commissionPaymentService = commissionPaymentService;
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @PostMapping("/commission")
    public Commission save(@RequestBody Commission commission){
        return commissionService.save(commission);
    }

    @GetMapping("/commission/{id}")
    public Optional<Commission> getById(@PathVariable(value = "id") Long id){
        return commissionService.find(id);
    }

    @GetMapping("/commission")
    public List<Commission> getAll(){
        return commissionService.findAll();
    }

    @DeleteMapping("/commission/{id}")
    public void deleteById(@PathVariable(value = "id") Long id){
        commissionService.delete(id);
    }

    @DeleteMapping("/commission")
    public void deleteAll(){
        commissionService.deleteAll();
    }

    @GetMapping("/commission/count")
    public long count(){
        return commissionService.count();
    }

    @PostMapping("/commission/agent/advanced")
    public PageDetails advancedAgent(@RequestBody PageDetails page) {
        Sort sort = SortColumn.commission(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Commission> agentPage;
        if (page.getText()==null || page.getText().isEmpty()){
            agentPage = commissionService.findAllByAgent(page,pageable);
        }else{
            agentPage = commissionService.findAllByAgentAndText(page,pageable);
        }
        page.setData(agentPage.getContent());
        page.setTotal(agentPage.getTotalElements());
        return page;
    }

    @PostMapping("/commission/agency/advanced")
    public PageDetails advancedAgency(@RequestBody PageDetails page) {
        Sort sort = SortColumn.commission(page.getColumn(),page.getSort());
        Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize(), sort);
        Page<Commission> agentPage;
        if (page.getText()==null || page.getText().isEmpty()){
            agentPage = commissionService.findAllByAgency(page,pageable);
        }else{
            agentPage = commissionService.findAllByAgencyAndText(page,pageable);
        }
        page.setData(agentPage.getContent());
        page.setTotal(agentPage.getTotalElements());
        return page;
    }

    @GetMapping("/commission/{id}/summery")
    public CommissionSummeryDto getSummery(@PathVariable(value = "id") Long id){
        CommissionSummeryDto summeryDto = new CommissionSummeryDto();
        Long total = commissionService.countByAgentOrAgencyId(id);
        Long completed = commissionService.completedCountByAgentOrAgencyId(id);
        Long pending = commissionService.pendingCountByAgentOrAgencyId(id);
        Double due = commissionService.dueAmountByAgentOrAgencyId(id);
        summeryDto.setTotalBills(total);
        summeryDto.setCompletedBills(completed);
        summeryDto.setPendingBills(pending);
        summeryDto.setDueAmount(due == null?0.0:due);
        return summeryDto;
    }

    @Transactional(javax.transaction.Transactional.TxType.REQUIRES_NEW)
    @PostMapping("/commission/pay")
    public CommissionPayment payCommissions(@RequestBody PayAllDto dto) {
        if (dto.getData()!=null && dto.getData().size() > 0){
            Optional<Account> accountOptional = accountService.find(dto.getAccountId());
            List<Commission> commissions = commissionService.findAllById(dto.getData());
            Double total = commissions.stream().mapToDouble(Commission::getAmount).sum();
            CommissionPayment payment = new CommissionPayment();
            accountOptional.ifPresent(account -> payment.setAccount(account));
            payment.setAmount(total);
            payment.setStatus(PaymentStatus.PAID);
            payment.setCommissions(commissions.stream().collect(Collectors.toSet()));
            CommissionPayment commissionPayment = commissionPaymentService.save(payment);

            AccountTransaction transaction = new AccountTransaction();
            transaction.setAccount(accountOptional.get());
            transaction.setAmount(total);
            transaction.setReferenceNumber(commissionPayment.getId().toString());
            transaction.setType(TransactionType.DEBIT);
            transaction.setReferenceTo(ReferenceTo.COMMISSION);
            transactionService.save(transaction);

            commissions.stream().forEach(commission -> {
                commission.setPaid(commission.getAmount());
                commission.setStatus(CommissionStatus.PAID);
            });
            commissionService.saveAll(commissions);
            return commissionPayment;
        }else {
            throw new NotFoundException("There are no commissions selected! Please select at least one commission record!");
        }
    }
}
