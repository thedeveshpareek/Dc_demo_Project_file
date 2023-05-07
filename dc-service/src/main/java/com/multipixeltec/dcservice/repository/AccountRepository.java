package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query(value = "SELECT * FROM ACCOUNT WHERE " +
            "NAME like %:#{#page.text}% OR " +
            "DESCRIPTION like %:#{#page.text}% ", nativeQuery = true)
    Page<Account> findAll(PageDetails page, Pageable pageable);


    @Query(value = "SELECT ACC.ID,ACC.NAME,ACC.DESCRIPTION, SUM(CASE WHEN ACT.TRANSACTION_TYPE='CREDIT' THEN ACT.AMOUNT ELSE 0 END) AS CREDIT, SUM(CASE WHEN ACT.TRANSACTION_TYPE='DEBIT' THEN ACT.AMOUNT ELSE 0 END) AS DEBIT FROM ACCOUNT AS ACC LEFT JOIN ACCOUNT_TRANSACTION AS ACT ON ACC.ID=ACT.ACCOUNT_ID GROUP BY ACC.ID",nativeQuery = true)
    List<AccountBalance> getAccountBalance();
}
