package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import com.multipixeltec.dcservice.model.BillPayment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillPaymentRepository extends JpaRepository<BillPayment, Long> {
    @Query(value = "SELECT * FROM BILL_PAYMENT WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<BillPayment> findAllByDate(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM BILL_PAYMENT WHERE (" +
            "BILL_ID like %:#{#page.text}% OR " +
            "AMOUNT like %:#{#page.text}% OR " +
            "CREATED_BY IN (SELECT ID FROM USERS WHERE FIRST_NAME LIKE %:#{#page.text}% OR LAST_NAME LIKE %:#{#page.text}%) OR " +
            "ACCOUNT_ID IN (SELECT ID FROM ACCOUNT WHERE NAME LIKE %:#{#page.text}%)) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<BillPayment> findAllByDateAndText(PageDetails page, Pageable pageable);
}
