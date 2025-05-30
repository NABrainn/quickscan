package com.scanner.entity.product;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @JsonProperty("cenaSuma")
    @Column(name = "cena_suma")
    private String sumPrice;

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

    @JsonBackReference
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
