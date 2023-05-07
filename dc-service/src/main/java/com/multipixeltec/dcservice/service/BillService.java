package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface BillService {

    Bill save(Bill bill);

    Optional<Bill> find(Long id);

    List<Bill> findAll();

    List<Bill> findAll(Sort sort);

    Page<Bill> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Bill bill);

    void deleteAll();

    long count();

    Page<Bill> findAllByDate(PageDetails page, Pageable pageable);

    Page<Bill> findAllByDateAndText(PageDetails page, Pageable pageable);

    List<Bill> findAllByPatient(Long id);

    Page<Bill> findAllByAgentTypeAndDate(String type, PageDetails page, Pageable pageable);

    Page<Bill> findAllByAgentTypeAndDateAndText(String type, PageDetails page, Pageable pageable);

    Double findBillAmountByDate(PageDetails page);

    Double findBillTotalByDate(String toString);

}
