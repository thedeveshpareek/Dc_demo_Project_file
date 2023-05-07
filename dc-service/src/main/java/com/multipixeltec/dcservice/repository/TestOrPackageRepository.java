package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.TestPackage;
import com.multipixeltec.dcservice.model.TestOrPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestOrPackageRepository extends JpaRepository<TestOrPackage, Long> {

    @Query("FROM TestOrPackage WHERE type=:type")
    List<TestOrPackage> findAll(TestPackage type);

    @Query("SELECT COUNT(tp) FROM TestOrPackage tp WHERE tp.type=:type")
    long count(TestPackage type);

    @Query(value = "SELECT * FROM TEST_OR_PACKAGE WHERE TYPE=:type",nativeQuery = true)
    Page<TestOrPackage> findAllByType(String type, Pageable pageable);

    @Query(value = "SELECT * FROM TEST_OR_PACKAGE WHERE (" +
            "NAME like %:#{#page.text}% OR " +
            "DESCRIPTION like %:#{#page.text}% OR " +
            "ACTIVE_STATUS like %:#{#page.text}% OR " +
            "PRICE = :#{#page.text}) AND TYPE=:type ",nativeQuery = true)
    Page<TestOrPackage> findAllByTextAndType(String type, PageDetails page, Pageable pageable);
}
