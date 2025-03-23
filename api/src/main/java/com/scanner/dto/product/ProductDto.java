package com.scanner.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
abstract class ProductDto {

    @JsonProperty("nazwaProduktu")
    private String productName;

    @JsonProperty("ilość")
    private String quantity;
}
