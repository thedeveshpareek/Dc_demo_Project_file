package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Expense;
import com.multipixeltec.dcservice.model.LabReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LabReportRepository extends JpaRepository<LabReport, Long> {

    @Query(value = "SELECT * FROM LAB_REPORTS WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<LabReport> findAllByDate(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM LAB_REPORTS WHERE (" +
            "FILE_NAME like %:#{#page.text}%) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<LabReport> findAllByDateAndText(PageDetails page, Pageable pageable);
}
