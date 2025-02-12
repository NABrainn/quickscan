package com.scanner.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReceiptProductDto(
        @JsonProperty("nazwaProduktu") String productName,
        @JsonProperty("cenaSuma") double cenaSuma,
        @JsonProperty("ilosc") int quantity) {
}
