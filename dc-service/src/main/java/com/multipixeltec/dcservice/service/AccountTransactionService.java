package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.AccountTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface AccountTransactionService {

    AccountTransaction save(AccountTransaction accounttransaction);

    Optional<AccountTransaction> find(Long id);

    List<AccountTransaction> findAll();

    List<AccountTransaction> findAll(Sort sort);

    Page<AccountTransaction> findAll(Pageable pageable);

    void delete(Long id);

    void delete(AccountTransaction accounttransaction);

    void deleteAll();

    long count();

    Optional<AccountTransaction> findByReferenceNumber(String referenceNumber, ReferenceTo referenceTo);

    Double findSumByAccountAndType(Long accountId, TransactionType type);

    Optional<AccountTransaction> findByReferenceNumberAndType(String id, TransactionType type);
}
