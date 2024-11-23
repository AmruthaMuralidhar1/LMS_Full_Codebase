package com.sqltest.demo.repository;

import com.sqltest.demo.model.SubscribedIndents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscribedIndentRepository extends JpaRepository<SubscribedIndents, Long> {
    boolean existsBySalesOrder_SoId(Long soId);
    @Query("SELECT so, si FROM SalesOrder so JOIN SubscribedIndents si ON so.soId = si.salesOrder.soId")
    List<Object[]> fetchSubscribedIndentsWithSalesOrder();
}