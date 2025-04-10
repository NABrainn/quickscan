package com.scanner.dto.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.scanner.dto.ClientDto;
import com.scanner.dto.VendorDto;
import com.scanner.dto.product.InvoiceProductDto;
import com.scanner.entity.product.InvoiceProduct;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
public class InvoiceDto extends DocumentDto {

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
    private ClientDto client;

    @JsonProperty("sprzedawca")
    private VendorDto vendor;

    @Getter(onMethod_ = { @JsonProperty("produkty") })
    @JsonSetter(contentNulls = Nulls.SKIP)
    private Set<InvoiceProductDto> products;

    @JsonProperty("type")
    private final String type = "invoice";
}
