package com.scanner.dto.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.scanner.dto.product.ReceiptProductDto;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReceiptDto extends DocumentDto{

    @JsonProperty("type")
    private final String type = "receipt";

    @JsonProperty("dataZakupu")
    private String purchaseDate;

    @JsonProperty("nazwaSklepu")
    private String storeName;

    @JsonProperty("kwotaCałkowita")
    private String totalAmount;

    @Getter(onMethod_ = { @JsonProperty("produkty") })
    @JsonSetter(contentNulls = Nulls.SKIP)
    private Set<ReceiptProductDto> products;

}

