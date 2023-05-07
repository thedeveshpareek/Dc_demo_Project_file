package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.PatientReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PatientReportRepository extends JpaRepository<PatientReport, Long> {
    @Query(value = "SELECT COUNT(ID) FROM PATIENT_REPORT WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Long countBetweenDate(PageDetails page);

    @Query(value = "SELECT COUNT(ID) FROM PATIENT_REPORT WHERE status IS NOT NULL AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Long completedCountBetweenDate(PageDetails page);

    @Query(value = "SELECT COUNT(ID) FROM PATIENT_REPORT WHERE status IS NULL AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Long pendingCountBetweenDate(PageDetails page);
}
