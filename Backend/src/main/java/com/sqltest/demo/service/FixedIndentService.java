package com.sqltest.demo.service;

import com.sqltest.demo.model.SalesOrder;
import com.sqltest.demo.repository.SalesOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FixedIndentService {

    @Autowired
    private SalesOrderRepo salesOrderRepo;

    public List<Map<String, Object>> getFixedIndents() {
        List<SalesOrder> salesOrders = salesOrderRepo.findByBiddingAndSubscribed("No",false);
        return salesOrders.stream().map(order -> {
            Map<String, Object> indentMap = new HashMap<>();
            indentMap.put("soId", order.getSoId());
            indentMap.put("warehouseName", order.getWarehouseName());
            indentMap.put("pickupLocation", order.getPickupLocation());
            indentMap.put("dropLocation", order.getDropLocation());
            indentMap.put("tags", order.getTags());
            indentMap.put("quantity", order.getQuantity());
            indentMap.put("distance", order.getDistance());

            String loadingDateTime = order.getLoadingDate() + " " + order.getLoadingTime();
            indentMap.put("loadingDateTime", loadingDateTime);

            String unloadingDateTime = order.getUnloadingDate() + " " + order.getUnloadingTime();
            indentMap.put("unloadingDateTime", unloadingDateTime);

            indentMap.put("totalAmount", order.getTotalAmount());
            indentMap.put("amountPerKm", order.getTotalAmount() / order.getDistance());
            indentMap.put("dispatchDetails", order.getDispatchDetails());
            return indentMap;
        }).collect(Collectors.toList());
    }
}
