package com.scanner.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ReceiptDto extends DocumentDto{

    @JsonProperty("dataZakupu")
    private String purchaseDate;

    @JsonProperty("nazwaSklepu")
    private String storeName;

    @JsonProperty("kwotaCałkowita")
    private double totalAmount;

    @Getter(onMethod_ = { @JsonProperty("produkty") })
    @JsonSetter(contentNulls = Nulls.SKIP)
    private Set<ReceiptProductDto> products;

}

