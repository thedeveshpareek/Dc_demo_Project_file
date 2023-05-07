package com.multipixeltec.dcservice.repository;

import com.multipixeltec.dcservice.model.CommissionPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommissionPaymentRepository extends JpaRepository<CommissionPayment, Long> {
}