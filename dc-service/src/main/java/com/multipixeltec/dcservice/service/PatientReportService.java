package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.PatientReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface PatientReportService {

    PatientReport save(PatientReport patientreport);

    Optional<PatientReport> find(Long id);

    List<PatientReport> findAll();

    List<PatientReport> findAll(Sort sort);

    Page<PatientReport> findAll(Pageable pageable);

    void delete(Long id);

    void delete(PatientReport patientreport);

    void deleteAll();

    long count();

    Long countBetweenDate(PageDetails page);

    Long completedCountBetweenDate(PageDetails page);

    Long pendingCountBetweenDate(PageDetails page);
}
