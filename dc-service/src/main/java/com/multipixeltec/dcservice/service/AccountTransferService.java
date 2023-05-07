package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.AccountTransfer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface AccountTransferService {

    AccountTransfer save(AccountTransfer accounttransfer);

    Optional<AccountTransfer> find(Long id);

    List<AccountTransfer> findAll();

    List<AccountTransfer> findAll(Sort sort);

    Page<AccountTransfer> findAll(Pageable pageable);

    void delete(Long id);

    void delete(AccountTransfer accounttransfer);

    void deleteAll();

    long count();

    Page<AccountTransfer> findAllByDate(PageDetails page, Pageable pageable);

    Page<AccountTransfer> findAllByDateAndText(PageDetails page, Pageable pageable);
}
