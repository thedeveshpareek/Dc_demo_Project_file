package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.DiagnosticReport;
import com.multipixeltec.dcservice.repository.DiagnosticReportRepository;
import com.multipixeltec.dcservice.service.DiagnosticReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class DiagnosticReportServiceImpl implements DiagnosticReportService {

    @Autowired
    private DiagnosticReportRepository diagnosticreportRepository;

    @Override
    public DiagnosticReport save(DiagnosticReport diagnosticreport) {
        return diagnosticreportRepository.save(diagnosticreport);
    }

    @Override
    public Optional<DiagnosticReport> find(Long id) {
        return diagnosticreportRepository.findById(id);
    }

    @Override
    public List<DiagnosticReport> findAll() {
        return diagnosticreportRepository.findAll();
    }

    @Override
    public List<DiagnosticReport> findAll(Sort sort){
        return diagnosticreportRepository.findAll(sort);
    }

    @Override
    public Page<DiagnosticReport> findAll(Pageable pageable){
        return diagnosticreportRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    diagnosticreportRepository.deleteById(id);
    }

    @Override
    public void delete(DiagnosticReport diagnosticreport) {
        diagnosticreportRepository.delete(diagnosticreport);
    }

    @Override
    public void deleteAll() {
        diagnosticreportRepository.deleteAll();
    }

    @Override
    public long count() {
        return diagnosticreportRepository.count();
    }

    @Override
    public Page<DiagnosticReport> findAll(PageDetails details, Pageable pageable) {
        return diagnosticreportRepository.findAll(details,pageable);
    }

    @Override
    public Page<DiagnosticReport> findAllByText(PageDetails details, Pageable pageable) {
        return diagnosticreportRepository.findAllByText(details,pageable);
    }

    @Override
    public List<DiagnosticReport> saveAll(List<DiagnosticReport> reports) {
        return diagnosticreportRepository.saveAll(reports);
    }

    @Override
    public List<DiagnosticReport> findAllByPatient(Long patientId) {
        return diagnosticreportRepository.findAllByPatient(patientId);
    }

    @Override
    public Long countBetweenDate(PageDetails page) {
        return diagnosticreportRepository.countBetweenDate(page);
    }

    @Override
    public Long countBetweenDateAndStatus(String status, PageDetails page) {
        return diagnosticreportRepository.countBetweenDateAndStatus(status,page);
    }

}
