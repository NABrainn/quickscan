package com.scanner.entity.product;

import com.scanner.entity.document.Receipt;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "receipt_products")
public class ReceiptProduct extends Product{

    @Column(name = "sum_price")
    private double sumPrice;

    @ManyToOne
    @JoinColumn(name = "receipt_id")
    private Receipt receipt;

    @Override
    public String toString() {
        return "ReceiptProduct{" +
                "sumPrice=" + sumPrice +
                ", receipt=" + receipt +
                '}';
    }
}
