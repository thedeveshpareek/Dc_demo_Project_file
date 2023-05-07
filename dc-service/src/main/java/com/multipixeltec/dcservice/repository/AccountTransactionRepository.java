package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.enums.ReferenceTo;
import com.multipixeltec.dcservice.enums.TransactionType;
import com.multipixeltec.dcservice.model.AccountTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, Long> {
    @Query("FROM AccountTransaction WHERE referenceNumber=:referenceNumber AND referenceTo=:referenceTo")
    Optional<AccountTransaction> findByReferenceNumber(String referenceNumber, ReferenceTo referenceTo);

    @Query("SELECT SUM(at.amount) FROM AccountTransaction at WHERE at.account.id=:accountId AND at.type=:type")
    Double findSumByAccountAndType(Long accountId, TransactionType type);

    @Query("FROM AccountTransaction WHERE referenceNumber=:id AND type=:type")
    Optional<AccountTransaction> findByReferenceNumberAndType(String id, TransactionType type);
}
