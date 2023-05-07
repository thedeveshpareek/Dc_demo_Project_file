package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Commission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface CommissionService {

    Commission save(Commission commission);

    Optional<Commission> find(Long id);

    List<Commission> findAll();

    List<Commission> findAll(Sort sort);

    Page<Commission> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Commission commission);

    void deleteAll();

    long count();

    List<Commission> saveAll(List<Commission> collect);

    Page<Commission> findAllByAgent(PageDetails page, Pageable pageable);

    Page<Commission> findAllByAgentAndText(PageDetails page, Pageable pageable);

    Page<Commission> findAllByAgency(PageDetails page, Pageable pageable);

    Page<Commission> findAllByAgencyAndText(PageDetails page, Pageable pageable);

    Long countByAgentOrAgencyId(Long id);

    Long completedCountByAgentOrAgencyId(Long id);

    Long pendingCountByAgentOrAgencyId(Long id);

    Double dueAmountByAgentOrAgencyId(Long id);

    List<Commission> findAllById(List<Long> data);

    Double totalBetweenDateAndType(String type, PageDetails page);
}
