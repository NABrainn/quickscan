package com.scanner.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = InvoiceProductDto.class, name = "invoiceProduct"),
        @JsonSubTypes.Type(value = ReceiptProductDto.class, name = "receiptProduct")
})
@Data
abstract class ProductDto {

    @JsonProperty("nazwaProduktu")
    private String productName;

    @JsonProperty("ilość")
    private String quantity;

    @JsonProperty("cenaSuma")
    String cenaSuma;
}
