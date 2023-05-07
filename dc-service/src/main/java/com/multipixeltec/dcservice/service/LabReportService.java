package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.LabReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface LabReportService {

    LabReport save(LabReport labreport);

    Optional<LabReport> find(Long id);

    List<LabReport> findAll();

    List<LabReport> findAll(Sort sort);

    Page<LabReport> findAll(Pageable pageable);

    void delete(Long id);

    void delete(LabReport labreport);

    void deleteAll();

    long count();

    Page<LabReport> findAllByDate(PageDetails page, Pageable pageable);

    Page<LabReport> findAllByDateAndText(PageDetails page, Pageable pageable);

    List<LabReport> saveAll(List<LabReport> labReports);
}
