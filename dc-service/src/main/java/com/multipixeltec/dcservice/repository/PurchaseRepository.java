package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.model.Purchase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    @Query(value = "SELECT * FROM PURCHASE WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Purchase> findAllByDate(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM PURCHASE WHERE (" +
            "AMOUNT like %:#{#page.text}% OR " +
            "NOTE like %:#{#page.text}% OR " +
            "REF_NO like %:#{#page.text}%) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Purchase> findAllByDateAndText(PageDetails page, Pageable pageable);

    @Query(value = "SELECT SUM(AMOUNT) FROM PURCHASE WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Double totalBetweenDate(PageDetails page);

    @Query(value = "SELECT SUM(AMOUNT) FROM PURCHASE WHERE CREATED_DATE LIKE %:date%", nativeQuery = true)
    Double findTotalByDate(String date);
}
