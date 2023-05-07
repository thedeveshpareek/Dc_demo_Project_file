package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.DiagnosticReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DiagnosticReportRepository extends JpaRepository<DiagnosticReport, Long> {

    @Query(value = "SELECT * FROM DIAGNOSTIC_TEST_REPORT WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<DiagnosticReport> findAll(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM DIAGNOSTIC_TEST_REPORT WHERE (" +
            "DESCRIPTION like %:#{#page.text}% OR " +
            "PATIENT_ID IN (SELECT ID FROM PATIENT WHERE FULL_NAME like %:#{#page.text}% OR PASSPORT_NO like %:#{#page.text}%) OR " +
            "TEST_ID IN (SELECT ID FROM TEST_OR_PACKAGE WHERE NAME like %:#{#page.text}%)) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<DiagnosticReport> findAllByText(PageDetails page, Pageable pageable);

    @Query("FROM DiagnosticReport WHERE patient.id=:patientId ORDER BY createdDate DESC")
    List<DiagnosticReport> findAllByPatient(Long patientId);

    @Query(value = "SELECT COUNT(ID) FROM DIAGNOSTIC_TEST_REPORT WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Long countBetweenDate(PageDetails page);

    @Query(value = "SELECT COUNT(ID) FROM DIAGNOSTIC_TEST_REPORT WHERE STATUS=:status AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Long countBetweenDateAndStatus(String status,PageDetails page);
}
