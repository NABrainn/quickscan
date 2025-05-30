package com.scanner.entity.document;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.product.InvoiceProduct;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "invoices")
public class Invoice extends Document{

    @JsonProperty("type")
    private final String type = "invoice";

    @JsonProperty("numerFaktury")
    @Column(name = "invoice_number")
    private String invoiceNumber;

    @JsonProperty("nrRachunkuBankowego")
    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @JsonProperty("dataWystawienia")
    @Column(name = "issue_date")
    private String issueDate;

    @JsonProperty("dataSprzedaży")
    @Column(name = "sale_date")
    private String saleDate;

    @JsonProperty("razemNetto")
    @Column(name = "total_netto")
    private String totalNetto;

    @JsonProperty("razemStawka")
    @Column(name = "total_rate")
    private String totalRate;

    @JsonProperty("razemPodatek")
    @Column(name = "total_tax")
    private String totalTax;

    @JsonProperty("razemBrutto")
    @Column(name = "total_gross")
    private String totalGross;

    @JsonProperty("waluta")
    @Column(name = "currency")
    private String currency;

    @JsonProperty("formaPłatności")
    @Column(name = "payment_method")
    private String paymentMethod;

    @JsonProperty("odbiorca")
    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @JsonProperty("sprzedawca")
    @JsonManagedReference
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id")
    private Vendor vendor;

    @JsonProperty("produkty")
    @JsonManagedReference
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InvoiceProduct> products;

    @Override
    public String toString() {
        return "Invoice{" +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", bankAccountNumber='" + bankAccountNumber + '\'' +
                ", issueDate=" + issueDate +
                ", saleDate=" + saleDate +
                ", totalNetto=" + totalNetto +
                ", totalRate=" + totalRate +
                ", totalTax=" + totalTax +
                ", totalGross=" + totalGross +
                ", currency='" + currency + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", client=" + client +
                ", vendor=" + vendor +
                ", products=" + products +
                '}';
    }
}
