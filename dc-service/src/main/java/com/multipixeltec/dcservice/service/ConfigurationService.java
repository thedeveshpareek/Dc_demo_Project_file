package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.Configuration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface ConfigurationService {

    Configuration save(Configuration configuration);

    Optional<Configuration> find(Long id);

    List<Configuration> findAll();

    List<Configuration> findAll(Sort sort);

    Page<Configuration> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Configuration configuration);

    void deleteAll();

    long count();

    Optional<Configuration> findFirst();

}
