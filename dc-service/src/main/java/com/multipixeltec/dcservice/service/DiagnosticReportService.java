package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.DiagnosticReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface DiagnosticReportService {

    DiagnosticReport save(DiagnosticReport diagnosticreport);

    Optional<DiagnosticReport> find(Long id);

    List<DiagnosticReport> findAll();

    List<DiagnosticReport> findAll(Sort sort);

    Page<DiagnosticReport> findAll(Pageable pageable);

    void delete(Long id);

    void delete(DiagnosticReport diagnosticreport);

    void deleteAll();

    long count();

    Page<DiagnosticReport> findAll(PageDetails details, Pageable pageable);

    Page<DiagnosticReport> findAllByText(PageDetails details, Pageable pageable);

    List<DiagnosticReport> saveAll(List<DiagnosticReport> reports);

    List<DiagnosticReport> findAllByPatient(Long patientId);


    Long countBetweenDateAndStatus(String status, PageDetails page);

    Long countBetweenDate(PageDetails page);
}
