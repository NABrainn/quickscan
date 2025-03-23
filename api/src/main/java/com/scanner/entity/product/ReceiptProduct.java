package com.scanner.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.document.Receipt;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "receipt_products")
public class ReceiptProduct extends Product{

    @JsonProperty("cenaSuma")
    @Column(name = "sum_price")
    private String sumPrice;

    @JsonBackReference
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
