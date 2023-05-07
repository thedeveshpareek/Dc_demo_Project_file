package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.LabReport;
import com.multipixeltec.dcservice.repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class LabReportServiceImpl implements LabReportService {

    @Autowired
    private LabReportRepository labreportRepository;

    @Override
    public LabReport save(LabReport labreport) {
        return labreportRepository.save(labreport);
    }

    @Override
    public Optional<LabReport> find(Long id) {
        return labreportRepository.findById(id);
    }

    @Override
    public List<LabReport> findAll() {
        return labreportRepository.findAll();
    }

    @Override
    public List<LabReport> findAll(Sort sort){
        return labreportRepository.findAll(sort);
    }

    @Override
    public Page<LabReport> findAll(Pageable pageable){
        return labreportRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    labreportRepository.deleteById(id);
    }

    @Override
    public void delete(LabReport labreport) {
        labreportRepository.delete(labreport);
    }

    @Override
    public void deleteAll() {
        labreportRepository.deleteAll();
    }

    @Override
    public long count() {
        return labreportRepository.count();
    }

    @Override
    public Page<LabReport> findAllByDate(PageDetails page, Pageable pageable) {
        return labreportRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<LabReport> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return labreportRepository.findAllByDateAndText(page,pageable);
    }

    @Override
    public List<LabReport> saveAll(List<LabReport> labReports) {
        return labreportRepository.saveAll(labReports);
    }

}
