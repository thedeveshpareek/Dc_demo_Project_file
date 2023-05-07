package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.PatientReport;
import com.multipixeltec.dcservice.repository.PatientReportRepository;
import com.multipixeltec.dcservice.service.PatientReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class PatientReportServiceImpl implements PatientReportService {

    @Autowired
    private PatientReportRepository patientreportRepository;

    @Override
    public PatientReport save(PatientReport patientreport) {
        return patientreportRepository.save(patientreport);
    }

    @Override
    public Optional<PatientReport> find(Long id) {
        return patientreportRepository.findById(id);
    }

    @Override
    public List<PatientReport> findAll() {
        return patientreportRepository.findAll();
    }

    @Override
    public List<PatientReport> findAll(Sort sort){
        return patientreportRepository.findAll(sort);
    }

    @Override
    public Page<PatientReport> findAll(Pageable pageable){
        return patientreportRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    patientreportRepository.deleteById(id);
    }

    @Override
    public void delete(PatientReport patientreport) {
        patientreportRepository.delete(patientreport);
    }

    @Override
    public void deleteAll() {
        patientreportRepository.deleteAll();
    }

    @Override
    public long count() {
        return patientreportRepository.count();
    }

    @Override
    public Long countBetweenDate(PageDetails page) {
        return patientreportRepository.countBetweenDate(page);
    }

    @Override
    public Long completedCountBetweenDate(PageDetails page) {
        return patientreportRepository.completedCountBetweenDate(page);
    }

    @Override
    public Long pendingCountBetweenDate(PageDetails page) {
        return patientreportRepository.pendingCountBetweenDate(page);
    }

}
