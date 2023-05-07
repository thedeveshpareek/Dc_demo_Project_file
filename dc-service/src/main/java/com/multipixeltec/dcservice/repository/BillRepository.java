package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {

    @Query(value = "SELECT * FROM BILL WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Bill> billService(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM BILL WHERE (PATIENT_ID IN (SELECT ID FROM PATIENT WHERE " +
            "FULL_NAME like %:#{#page.text}% OR " +
            "PASSPORT_NO like %:#{#page.text}% OR " +
            "REG_NO like %:#{#page.text}% OR " +
            "EMAIL like %:#{#page.text}% OR " +
            "MOBILE like %:#{#page.text}% OR " +
            "VISA_NO like %:#{#page.text}%) OR AGENT_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE FULL_NAME LIKE %:#{#page.text}%)) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Bill> findAllByDateAndText(PageDetails page, Pageable pageable);

    @Query("FROM Bill WHERE patient.id=:id ORDER BY createdDate DESC")
    List<Bill> findAllByPatient(Long id);


    @Query(value = "SELECT * FROM BILL WHERE " +
            "AGENT_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE TYPE=:type) AND " +
            "CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Bill> findAllByAgentTypeAndDate(String type ,PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM BILL WHERE (PATIENT_ID IN (SELECT ID FROM PATIENT WHERE " +
            "FULL_NAME like %:#{#page.text}% OR " +
            "PASSPORT_NO like %:#{#page.text}% OR " +
            "REG_NO like %:#{#page.text}% OR " +
            "EMAIL like %:#{#page.text}% OR " +
            "MOBILE like %:#{#page.text}% OR " +
            "VISA_NO like %:#{#page.text}%) OR " +
            "AGENT_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE FULL_NAME LIKE %:#{#page.text}%)) AND AGENT_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE TYPE=:type) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Bill> findAllByAgentTypeAndDateAndText(String type ,PageDetails page, Pageable pageable);

    @Query(value = "SELECT SUM(AMOUNT) FROM BILL WHERE  CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Double findBillAmountByDate(PageDetails page);

    @Query(value = "SELECT SUM(AMOUNT) FROM BILL WHERE  CREATED_DATE LIKE %:date%", nativeQuery = true)
    Double findBillTotalByDate(String date);
}
