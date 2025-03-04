package com.scanner.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ReceiptProductDto extends ProductDto {

    @JsonProperty("cenaSuma")
    String cenaSuma;
}
