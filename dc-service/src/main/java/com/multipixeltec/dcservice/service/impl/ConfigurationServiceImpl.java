package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.Configuration;
import com.multipixeltec.dcservice.repository.ConfigurationRepository;
import com.multipixeltec.dcservice.service.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class ConfigurationServiceImpl implements ConfigurationService {

    @Autowired
    private ConfigurationRepository configurationRepository;

    @Override
    public Configuration save(Configuration configuration) {
        return configurationRepository.save(configuration);
    }

    @Override
    public Optional<Configuration> find(Long id) {
        return configurationRepository.findById(id);
    }

    @Override
    public List<Configuration> findAll() {
        return configurationRepository.findAll();
    }

    @Override
    public List<Configuration> findAll(Sort sort){
        return configurationRepository.findAll(sort);
    }

    @Override
    public Page<Configuration> findAll(Pageable pageable){
        return configurationRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    configurationRepository.deleteById(id);
    }

    @Override
    public void delete(Configuration configuration) {
        configurationRepository.delete(configuration);
    }

    @Override
    public void deleteAll() {
        configurationRepository.deleteAll();
    }

    @Override
    public long count() {
        return configurationRepository.count();
    }

    @Override
    public Optional<Configuration> findFirst() {
        return configurationRepository.findFirst();
    }

}
