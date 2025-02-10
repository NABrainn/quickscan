package com.scanner.entity.product;

import com.scanner.entity.document.Invoice;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "invoice_product")
public class InvoiceProduct extends Product{

    @Column(name = "measure_unit")
    private String measureUnit;

    @Column(name = "net_worth")
    private double netWorth;

    @Column(name = "VAT_rate")
    private double vatRate;

    @Column(name = "VAT_tax")
    private double vatTax;

    @Column(name = "gross")
    private double gross;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    @Override
    public String toString() {
        return "InvoiceProduct{" +
                "measureUnit='" + measureUnit + '\'' +
                ", netWorth=" + netWorth +
                ", vatRate=" + vatRate +
                ", vatTax=" + vatTax +
                ", gross=" + gross +
                ", invoice=" + invoice +
                '}';
    }
}
