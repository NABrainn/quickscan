package com.scanner.entity.document;

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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
    private double totalNetto;

    @JsonProperty("razemStawka")
    @Column(name = "total_rate")
    private double totalRate;

    @JsonProperty("razemPodatek")
    @Column(name = "total_tax")
    private String totalTax;

    @JsonProperty("razemBrutto")
    @Column(name = "total_gross")
    private double totalGross;

    @JsonProperty("waluta")
    @Column(name = "currency")
    private String currency;

    @JsonProperty("formaPłatności")
    @Column(name = "payment_method")
    private String paymentMethod;

    @JsonProperty("odbiorca")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @JsonProperty("sprzedawca")
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id")
    private Vendor vendor;

    @JsonProperty("produkty")
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<InvoiceProduct> products;

    @Override
    public String toString() {
        return "Invoice{" +
                "id=" + id +
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
