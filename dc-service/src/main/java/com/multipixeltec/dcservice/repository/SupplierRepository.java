package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    @Query(value = "SELECT * FROM SUPPLIER WHERE " +
            "NAME like %:#{#page.text}% OR " +
            "CONTACT_NO like %:#{#page.text}% OR " +
            "EMAIL like %:#{#page.text}% OR " +
            "COMPANY like %:#{#page.text}%", nativeQuery = true)
    Page<Supplier> findAllByText(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM SUPPLIER", nativeQuery = true)
    Page<Supplier> findAllNative(Pageable pageable);
}
