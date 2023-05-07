package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.model.PackageItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface PackageItemService {

    PackageItem save(PackageItem packageitem);

    Optional<PackageItem> find(Long id);

    List<PackageItem> findAll();

    List<PackageItem> findAll(Sort sort);

    Page<PackageItem> findAll(Pageable pageable);

    void delete(Long id);

    void delete(PackageItem packageitem);

    void deleteAll();

    long count();

    List<PackageItem> saveAll(List<PackageItem> items);

    List<PackageItem> findAllByPackageId(Long packageId);

    Optional<PackageItem> findByPackageAndTest(Long pkgId, Long testId);
}
