package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.model.TestOrPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TestOrPackageService {

    TestOrPackage save(TestOrPackage testorpackage);

    Optional<TestOrPackage> find(Long id);

    List<TestOrPackage> findAll();

    List<TestOrPackage> findAll(Sort sort);

    Page<TestOrPackage> findAll(Pageable pageable);

    void delete(Long id);

    void delete(TestOrPackage testorpackage);

    void deleteAll();

    long count();

    List<TestOrPackage> findAll(TestPackage type);

    long count(TestPackage toUpperCase);

    Page<TestOrPackage> findAllByType(String type, Pageable pageable);

    Page<TestOrPackage> findAllByTextAndType(String type, PageDetails page, Pageable pageable);

    List<TestOrPackage> saveAll(List<TestOrPackage> agentOrAgencyList);

    List<TestOrPackage> findAllById(Set<Long> collect);
}
