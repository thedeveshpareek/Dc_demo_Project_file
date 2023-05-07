package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.model.TestOrPackage;
import com.multipixeltec.dcservice.repository.TestOrPackageRepository;
import com.multipixeltec.dcservice.service.TestOrPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TestOrPackageServiceImpl implements TestOrPackageService {

    @Autowired
    private TestOrPackageRepository testorpackageRepository;

    @Override
    public TestOrPackage save(TestOrPackage testorpackage) {
        return testorpackageRepository.save(testorpackage);
    }

    @Override
    public Optional<TestOrPackage> find(Long id) {
        return testorpackageRepository.findById(id);
    }

    @Override
    public List<TestOrPackage> findAll() {
        return testorpackageRepository.findAll();
    }

    @Override
    public List<TestOrPackage> findAll(Sort sort){
        return testorpackageRepository.findAll(sort);
    }

    @Override
    public Page<TestOrPackage> findAll(Pageable pageable){
        return testorpackageRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    testorpackageRepository.deleteById(id);
    }

    @Override
    public void delete(TestOrPackage testorpackage) {
        testorpackageRepository.delete(testorpackage);
    }

    @Override
    public void deleteAll() {
        testorpackageRepository.deleteAll();
    }

    @Override
    public long count() {
        return testorpackageRepository.count();
    }

    @Override
    public List<TestOrPackage> findAll(TestPackage type) {
        return testorpackageRepository.findAll(type);
    }

    @Override
    public long count(TestPackage type) {
        return testorpackageRepository.count(type);
    }

    @Override
    public Page<TestOrPackage> findAllByType(String type, Pageable pageable) {
        return testorpackageRepository.findAllByType(type,pageable);
    }

    @Override
    public Page<TestOrPackage> findAllByTextAndType(String type, PageDetails page, Pageable pageable) {
        return testorpackageRepository.findAllByTextAndType(type,page,pageable);
    }

    @Override
    public List<TestOrPackage> saveAll(List<TestOrPackage> agentOrAgencyList) {
        return testorpackageRepository.saveAll(agentOrAgencyList);
    }

    @Override
    public List<TestOrPackage> findAllById(Set<Long> collect) {
        return testorpackageRepository.findAllById(collect);
    }


}
