package com.multipixeltec.dcservice.dto;

import com.multipixeltec.dcservice.model.AccountBalance;
import com.multipixeltec.dcservice.model.AgentOrAgency;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO for the {@link AgentOrAgency} entity
 */
@Data
public class DashboardMetricsDto implements Serializable {
    private Double totalBillAmount;
    private Double totalPurchase;
    private Double totalExpenses;
    private Double totalAgencyCommissions;
    private Double totalAgentCommissions;
    private Long totalTestCount;
    private Long totalTestCompleted;
    private Long totalTestPending;

    private List<String> labels = new ArrayList<>();
    private List<AccountBalance> accountBalances = new ArrayList<>();
    private List<List<Double>> data = new ArrayList<>();


}
