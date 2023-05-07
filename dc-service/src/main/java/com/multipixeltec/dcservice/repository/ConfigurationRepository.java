package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ConfigurationRepository extends JpaRepository<Configuration, Long> {
    @Query(value = "SELECT * FROM  CONFIGURATION LIMIT 1",nativeQuery = true)
    Optional<Configuration> findFirst();

}
