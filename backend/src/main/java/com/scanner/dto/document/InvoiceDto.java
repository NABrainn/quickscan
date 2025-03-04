package com.scanner.dto.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.Client;
import com.scanner.entity.Vendor;
import com.scanner.entity.product.InvoiceProduct;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
public class InvoiceDto extends DocumentDto {

    @JsonProperty("type")
    private final String type = "invoice";

    @JsonProperty("numerFaktury")
    private String invoiceNumber;

    @JsonProperty("nrRachunkuBankowego")
    private String bankAccountNumber;

    @JsonProperty("dataWystawienia")
    private String issueDate;

    @JsonProperty("dataSprzedaży")
    private String saleDate;

    @JsonProperty("razemNetto")
    private String totalNetto;

    @JsonProperty("razemStawka")
    private String totalRate;

    @JsonProperty("razemPodatek")
    private String totalTax;

    @JsonProperty("razemBrutto")
    private String totalGross;

    @JsonProperty("waluta")
    private String currency;

    @JsonProperty("formaPłatności")
    private String paymentMethod;

    @JsonProperty("odbiorca")
    private Client client;

    @JsonProperty("sprzedawca")
    private Vendor vendor;

    @Getter(onMethod_ = { @JsonProperty("produkty") })
    private Set<InvoiceProduct> products;
}
