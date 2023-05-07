package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.PackageItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PackageItemRepository extends JpaRepository<PackageItem, Long> {
    @Query("FROM PackageItem WHERE pkg.id=:packageId")
    List<PackageItem> findAllByPackageId(Long packageId);

    @Query("FROM PackageItem WHERE pkg.id=:pkgId AND test.id=:testId")
    Optional<PackageItem> findByPackageAndTest(Long pkgId, Long testId);
}
