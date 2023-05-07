package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("FROM Patient p WHERE p.fullName like %:value% OR p.passportNo like %:value% OR p.mobile like %:value% OR p.email like %:value% OR p.regNo like %:value%")
    Page<Patient> findAll(String value, Pageable pageable);

    @Query(value = "SELECT * FROM PATIENT WHERE CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Patient> findAllByDate(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM PATIENT WHERE (" +
            "FULL_NAME like %:#{#page.text}% OR " +
            "PASSPORT_NO like %:#{#page.text}% OR " +
            "REG_NO like %:#{#page.text}% OR " +
            "EMAIL like %:#{#page.text}% OR " +
            "MOBILE like %:#{#page.text}% OR " +
            "VISA_NO like %:#{#page.text}% OR AGENCY_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE FULL_NAME LIKE %:#{#page.text}%)) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Patient> findAllByDateAndText(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM PATIENT WHERE " +
            "FULL_NAME like %:#{#text}% OR " +
            "PASSPORT_NO like %:#{#text}% OR " +
            "REG_NO like %:#{#text}% OR " +
            "EMAIL like %:#{#text}% OR " +
            "MOBILE like %:#{#text}% OR " +
            "VISA_NO like %:#{#text}% ", nativeQuery = true)
    List<Patient> searchByText(String text,Pageable pageable);

    @Query("FROM Patient p WHERE p.passportNo=:passport")
    List<Patient> findByPassport(String passport);

    @Query(value = "SELECT COUNT(ID) FROM PATIENT WHERE CREATED_DATE like :date%", nativeQuery = true)
    long countByMonth(String date);

    @Query(value = "SELECT * FROM PATIENT WHERE CREATED_DATE like :date%", nativeQuery = true)
    List<Patient> findAllByMonth(String date);
}
