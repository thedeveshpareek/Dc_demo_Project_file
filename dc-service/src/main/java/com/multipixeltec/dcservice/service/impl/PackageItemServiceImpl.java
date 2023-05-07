package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.model.PackageItem;
import com.multipixeltec.dcservice.repository.PackageItemRepository;
import com.multipixeltec.dcservice.service.PackageItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class PackageItemServiceImpl implements PackageItemService {

    @Autowired
    private PackageItemRepository packageitemRepository;

    @Override
    public PackageItem save(PackageItem packageitem) {
        return packageitemRepository.save(packageitem);
    }

    @Override
    public Optional<PackageItem> find(Long id) {
        return packageitemRepository.findById(id);
    }

    @Override
    public List<PackageItem> findAll() {
        return packageitemRepository.findAll();
    }

    @Override
    public List<PackageItem> findAll(Sort sort){
        return packageitemRepository.findAll(sort);
    }

    @Override
    public Page<PackageItem> findAll(Pageable pageable){
        return packageitemRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    packageitemRepository.deleteById(id);
    }

    @Override
    public void delete(PackageItem packageitem) {
        packageitemRepository.delete(packageitem);
    }

    @Override
    public void deleteAll() {
        packageitemRepository.deleteAll();
    }

    @Override
    public long count() {
        return packageitemRepository.count();
    }

    @Override
    public List<PackageItem> saveAll(List<PackageItem> items) {
        return packageitemRepository.saveAll(items);
    }

    @Override
    public List<PackageItem> findAllByPackageId(Long packageId) {
        return packageitemRepository.findAllByPackageId(packageId);
    }

    @Override
    public Optional<PackageItem> findByPackageAndTest(Long pkgId, Long testId) {
        return packageitemRepository.findByPackageAndTest(pkgId,testId);
    }

}
