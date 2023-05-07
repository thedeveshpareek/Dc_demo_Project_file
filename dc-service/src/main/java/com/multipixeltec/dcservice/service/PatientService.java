package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface PatientService {

    Patient save(Patient patient);

    Optional<Patient> find(Long id);

    List<Patient> findAll();

    List<Patient> findAll(Sort sort);

    Page<Patient> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Patient patient);

    void deleteAll();

    long count();

    List<Patient> saveAll(List<Patient> patientList);

    Page<Patient> findAll(String query, Pageable page);

    Page<Patient> findAllByDate(PageDetails page, Pageable pageable);

    Page<Patient> findAllByDateAndText(PageDetails page, Pageable pageable);

    List<Patient> searchByText(String text,Pageable pageable);

    List<Patient> findByPassport(String passport);

    long countByMonth(String date);

    List<Patient> findAllByMonth(String date);
}
