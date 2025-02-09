package com.scanner.entity.document;

import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.product.InvoiceProduct;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "invoices")
public class Invoice extends Document{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "issue_date")
    private Date issueDate;

    @Column(name = "sale_date")
    private Date saleDate;

    @Column(name = "total_netto")
    private double totalNetto;

    @Column(name = "total_rate")
    private double totalRate;

    @Column(name = "total_tax")
    private double totalTax;

    @Column(name = "total_gross")
    private double totalGross;

    @Column(name = "currency")
    private String currency;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vendor_id", referencedColumnName = "id")
    private Vendor vendor;

    @OneToMany(mappedBy = "invoice")
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
