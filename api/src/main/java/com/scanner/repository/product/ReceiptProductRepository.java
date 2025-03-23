package com.scanner.repository.product;

import com.scanner.entity.product.ReceiptProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptProductRepository extends JpaRepository<ReceiptProduct, Long> {
}
