package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.enums.AgentAgency;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AgentOrAgencyRepository extends JpaRepository<AgentOrAgency, Long> {
    @Query("FROM AgentOrAgency WHERE type=:type")
    List<AgentOrAgency> findAll(AgentAgency type);

    @Query("SELECT COUNT(a) FROM AgentOrAgency a WHERE a.type=:type")
    long count(AgentAgency type);

    @Query(value = "SELECT * FROM AGENT_OR_AGENCY WHERE TYPE=:type AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')",nativeQuery = true)
    Page<AgentOrAgency> findAllByType(String type, PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM AGENT_OR_AGENCY WHERE (" +
            "FULL_NAME like %:#{#page.text}% OR " +
            "EMAIL like %:#{#page.text}% OR " +
            "MOBILE like %:#{#page.text}% OR " +
            "ADDRESS like %:#{#page.text}% OR " +
            "COMMISSION_RATE = :#{#page.text} OR " +
            "COMMISSION_AMOUNT = :#{#page.text}) AND TYPE=:type AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')",nativeQuery = true)
    Page<AgentOrAgency> findAllByTypeAndText(String type,PageDetails page, Pageable pageable);
}
