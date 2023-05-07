package com.multipixeltec.dcservice.service.impl;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.repository.PatientRepository;
import com.multipixeltec.dcservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Optional<Patient> find(Long id) {
        return patientRepository.findById(id);
    }

    @Override
    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    @Override
    public List<Patient> findAll(Sort sort){
        return patientRepository.findAll(sort);
    }

    @Override
    public Page<Patient> findAll(Pageable pageable){
        return patientRepository.findAll(pageable);
    }

    @Override
    public void delete(Long id) {
    patientRepository.deleteById(id);
    }

    @Override
    public void delete(Patient patient) {
        patientRepository.delete(patient);
    }

    @Override
    public void deleteAll() {
        patientRepository.deleteAll();
    }

    @Override
    public long count() {
        return patientRepository.count();
    }

    @Override
    public List<Patient> saveAll(List<Patient> patientList) {
        return patientRepository.saveAll(patientList);
    }

    @Override
    public Page<Patient> findAll(String query, Pageable page) {
        return patientRepository.findAll(query,page);
    }

    @Override
    public Page<Patient> findAllByDate(PageDetails page, Pageable pageable) {
        return patientRepository.findAllByDate(page,pageable);
    }

    @Override
    public Page<Patient> findAllByDateAndText(PageDetails page, Pageable pageable) {
        return patientRepository.findAllByDateAndText(page,pageable);
    }

    @Override
    public List<Patient> searchByText(String text,Pageable pageable) {
        return patientRepository.searchByText(text,pageable);
    }

    @Override
    public List<Patient> findByPassport(String passport) {
        return patientRepository.findByPassport(passport);
    }

    @Override
    public long countByMonth(String date) {
        return patientRepository.countByMonth(date);
    }

    @Override
    public List<Patient> findAllByMonth(String date) {
        return patientRepository.findAllByMonth(date);
    }

}
