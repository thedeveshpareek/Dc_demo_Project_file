package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.dto.PageDetails;
import com.multipixeltec.dcservice.model.Commission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommissionRepository extends JpaRepository<Commission, Long> {
    @Query(value = "SELECT * FROM COMMISSION WHERE AGENT_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE TYPE='AGENT') AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Commission> findAllByAgent(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM COMMISSION WHERE " +
            "AGENT_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE (" +
            "FULL_NAME LIKE %:#{#page.text}% OR MOBILE LIKE %:#{#page.text}% OR EMAIL LIKE %:#{#page.text}%) AND TYPE='AGENT') AND " +
            "CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Commission> findAllByAgentAndText(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM COMMISSION WHERE AGENT_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE TYPE='AGENCY') AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Commission> findAllByAgency(PageDetails page, Pageable pageable);

    @Query(value = "SELECT * FROM COMMISSION WHERE " +
            "AGENT_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE (" +
            "FULL_NAME LIKE %:#{#page.text}% OR MOBILE LIKE %:#{#page.text}% OR EMAIL LIKE %:#{#page.text}%) AND TYPE='AGENCY') AND " +
            "CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Page<Commission> findAllByAgencyAndText(PageDetails page, Pageable pageable);

    @Query("SELECT COUNT(c) FROM Commission c WHERE c.agentOrAgency.id=:id")
    Long countByAgentOrAgencyId(Long id);

    @Query("SELECT COUNT(c) FROM Commission c WHERE c.agentOrAgency.id=:id AND c.status = com.multipixeltec.dcservice.enums.CommissionStatus.PAID")
    Long completedCountByAgentOrAgencyId(Long id);

    @Query("SELECT COUNT(c) FROM Commission c WHERE c.agentOrAgency.id=:id AND c.status <> com.multipixeltec.dcservice.enums.CommissionStatus.PAID")
    Long pendingCountByAgentOrAgencyId(Long id);

    @Query("SELECT SUM(c.amount) FROM Commission c WHERE c.agentOrAgency.id=:id AND c.status <> com.multipixeltec.dcservice.enums.CommissionStatus.PAID")
    Double dueAmountByAgentOrAgencyId(Long id);

    @Query(value = "SELECT SUM(AMOUNT) FROM COMMISSION WHERE AGENT_OR_AGENCY_ID IN (SELECT ID FROM AGENT_OR_AGENCY WHERE TYPE=:type) AND CREATED_DATE > :#{#page.from} AND CREATED_DATE <= CONCAT(:#{#page.to}, 'T23:59:59')", nativeQuery = true)
    Double totalBetweenDateAndType(String type, PageDetails page);
}
