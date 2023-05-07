package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Commission;
import com.multipixeltec.dcservice.repository.CommissionRepository;
import com.multipixeltec.dcservice.service.CommissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class CommissionServiceImpl implements CommissionService {

    @Autowired
    private CommissionRepository commissionRepository;

    @Override
    public Commission save(Commission commission) {
        return commissionRepository.save(commission);
    }

    @Override
    public Optional<Commission> find(Long id) {
        return commissionRepository.findById(id);
    }

    @Override
    public List<Commission> findAll() {
        return commissionRepository.findAll();
    }

    @Override
    public List<Commission> findAll(Sort sort){
        return commissionRepository.findAll(sort);
    }

    @Override
    public Page<Commission> findAll(Pageable pageable){
        return commissionRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    commissionRepository.deleteById(id);
    }

    @Override
    public void delete(Commission commission) {
        commissionRepository.delete(commission);
    }

    @Override
    public void deleteAll() {
        commissionRepository.deleteAll();
    }

    @Override
    public long count() {
        return commissionRepository.count();
    }

    @Override
    public List<Commission> saveAll(List<Commission> collect) {
        return commissionRepository.saveAll(collect);
    }

    @Override
    public Page<Commission> findAllByAgent(PageDetails page, Pageable pageable) {
        return commissionRepository.findAllByAgent(page,pageable);
    }

    @Override
    public Page<Commission> findAllByAgentAndText(PageDetails page, Pageable pageable) {
        return commissionRepository.findAllByAgentAndText(page,pageable);
    }

    @Override
    public Page<Commission> findAllByAgency(PageDetails page, Pageable pageable) {
        return commissionRepository.findAllByAgency(page,pageable);
    }

    @Override
    public Page<Commission> findAllByAgencyAndText(PageDetails page, Pageable pageable) {
        return commissionRepository.findAllByAgencyAndText(page,pageable);
    }

    @Override
    public Long countByAgentOrAgencyId(Long id) {
        return commissionRepository.countByAgentOrAgencyId(id);
    }

    @Override
    public Long completedCountByAgentOrAgencyId(Long id) {
        return commissionRepository.completedCountByAgentOrAgencyId(id);
    }

    @Override
    public Long pendingCountByAgentOrAgencyId(Long id) {
        return commissionRepository.pendingCountByAgentOrAgencyId(id);
    }

    @Override
    public Double dueAmountByAgentOrAgencyId(Long id) {
        return commissionRepository.dueAmountByAgentOrAgencyId(id);
    }

    @Override
    public List<Commission> findAllById(List<Long> data) {
        return commissionRepository.findAllById(data);
    }

    @Override
    public Double totalBetweenDateAndType(String type, PageDetails page) {
        return commissionRepository.totalBetweenDateAndType(type,page);
    }

}
