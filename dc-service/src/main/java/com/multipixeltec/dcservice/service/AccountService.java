package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Account;
import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.model.TestOrPackage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    Account save(Account account);

    Optional<Account> find(Long id);

    List<Account> findAll();

    List<Account> findAll(Sort sort);

    Page<Account> findAll(Pageable pageable);

    void delete(Long id);

    void delete(Account account);

    void deleteAll();

    long count();

    Page<Account> findAllByText(PageDetails page, Pageable pageable);

    List<AccountBalance> getAccountBalance();

}
