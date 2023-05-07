package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface AgentOrAgencyService {

    AgentOrAgency save(AgentOrAgency agentoragency);

    Optional<AgentOrAgency> find(Long id);

    List<AgentOrAgency> findAll();

    List<AgentOrAgency> findAll(Sort sort);

    Page<AgentOrAgency> findAll(Pageable pageable);

    void delete(Long id);

    void delete(AgentOrAgency agentoragency);

    void deleteAll();

    long count();

    List<AgentOrAgency> findAll(AgentAgency type);

    long count(AgentAgency type);

    Page<AgentOrAgency> findAllByType(String type, PageDetails page, Pageable pageable);

    Page<AgentOrAgency> findAllByTextAndType(String type, PageDetails page, Pageable pageable);

    List<AgentOrAgency> saveAll(List<AgentOrAgency> agentOrAgencyList);
}
