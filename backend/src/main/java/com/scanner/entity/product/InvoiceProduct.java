package com.scanner.entity.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "invoice_products")
public class InvoiceProduct extends Product{

    @JsonProperty("jednostkaMiary")
    @Column(name = "measure_unit")
    private String measureUnit;

    @JsonProperty("wartośćNetto")
    @Column(name = "net_worth")
    private String netWorth;

    @JsonProperty("stawkaVAT")
    @Column(name = "VAT_rate")
    private String vatRate;

    @JsonProperty("podatekVAT")
    @Column(name = "VAT_tax")
    private String vatTax;

    @JsonProperty("wartośćBrutto")
    @Column(name = "gross")
    private String gross;

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
