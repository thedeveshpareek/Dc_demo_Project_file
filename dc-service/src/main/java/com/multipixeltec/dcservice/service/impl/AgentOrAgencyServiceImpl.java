package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import com.multipixeltec.dcservice.repository.AgentOrAgencyRepository;
import com.multipixeltec.dcservice.service.AgentOrAgencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class AgentOrAgencyServiceImpl implements AgentOrAgencyService {

    @Autowired
    private AgentOrAgencyRepository agentoragencyRepository;

    @Override
    public AgentOrAgency save(AgentOrAgency agentoragency) {
        return agentoragencyRepository.save(agentoragency);
    }

    @Override
    public Optional<AgentOrAgency> find(Long id) {
        return agentoragencyRepository.findById(id);
    }

    @Override
    public List<AgentOrAgency> findAll() {
        return agentoragencyRepository.findAll();
    }

    @Override
    public List<AgentOrAgency> findAll(Sort sort){
        return agentoragencyRepository.findAll(sort);
    }

    @Override
    public Page<AgentOrAgency> findAll(Pageable pageable){
        return agentoragencyRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    agentoragencyRepository.deleteById(id);
    }

    @Override
    public void delete(AgentOrAgency agentoragency) {
        agentoragencyRepository.delete(agentoragency);
    }

    @Override
    public void deleteAll() {
        agentoragencyRepository.deleteAll();
    }

    @Override
    public long count() {
        return agentoragencyRepository.count();
    }

    @Override
    public List<AgentOrAgency> findAll(AgentAgency type) {
        return agentoragencyRepository.findAll(type);
    }

    @Override
    public long count(AgentAgency type) {
        return agentoragencyRepository.count(type);
    }

    @Override
    public Page<AgentOrAgency> findAllByType(String type, PageDetails page, Pageable pageable) {
        return agentoragencyRepository.findAllByType(type,page,pageable);
    }

    @Override
    public Page<AgentOrAgency> findAllByTextAndType(String type, PageDetails page, Pageable pageable) {
        return agentoragencyRepository.findAllByTypeAndText(type,page,pageable);
    }

    @Override
    public List<AgentOrAgency> saveAll(List<AgentOrAgency> agentOrAgencyList) {
        return agentoragencyRepository.saveAll(agentOrAgencyList);
    }

}
