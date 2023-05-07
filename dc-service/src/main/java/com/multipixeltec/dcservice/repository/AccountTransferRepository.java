package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.AccountTransfer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AccountTransferRepository extends JpaRepository<AccountTransfer, Long> {

    @Query(value = "SELECT * FROM ACCOUNT_TRANSFER WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<AccountTransfer> findAllByDate(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM ACCOUNT_TRANSFER WHERE (" +
            "FROM_ACCOUNT_ID IN (SELECT ID FROM ACCOUNT WHERE NAME LIKE %:#{#page.text}%) OR " +
            "TO_ACCOUNT_ID IN (SELECT ID FROM ACCOUNT WHERE NAME LIKE %:#{#page.text}%) OR " +
            "BILL_ID like %:#{#page.text}% OR " +
            "AMOUNT like %:#{#page.text}% OR " +
            "CREATED_BY IN (SELECT ID FROM USERS WHERE FIRST_NAME LIKE %:#{#page.text}% OR LAST_NAME LIKE %:#{#page.text}%)) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<AccountTransfer> findAllByDateAndText(PageDetails page, Pageable pageable);
}
