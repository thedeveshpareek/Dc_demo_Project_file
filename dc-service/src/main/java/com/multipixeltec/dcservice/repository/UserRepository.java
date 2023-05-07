package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Patient;
import com.multipixeltec.dcservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    @Query("FROM User WHERE email=:username")
    Optional<User> findByEmail(String username);

    @Query(value = "SELECT * FROM USERS WHERE FIRST_NAME like %:#{#page.text}% OR LAST_NAME like %:#{#page.text}% OR EMAIL like %:#{#page.text}%", nativeQuery = true)
    Page<User> findAllByText(PageDetails page, Pageable pageable);
}
