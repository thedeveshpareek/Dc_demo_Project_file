package com.multipixeltec.dcservice.service;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User save(User user);

    Optional<User> find(Long id);

    List<User> findAll();

    List<User> findAll(Sort sort);

    Page<User> findAll(Pageable pageable);

    void delete(Long id);

    void delete(User user);

    void deleteAll();

    long count();

    Optional<User> findByEmail(String name);


    Page<User> findAllByText(PageDetails page, Pageable pageable);
}
