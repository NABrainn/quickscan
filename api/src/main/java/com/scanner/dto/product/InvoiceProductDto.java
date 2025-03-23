package com.scanner.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class InvoiceProductDto extends ProductDto {

        @JsonProperty("jednostkaMiary")
        private String measureUnit;

        @JsonProperty("wartośćNetto")
        private String netWorth;

        @JsonProperty("stawkaVAT")
        private String vatRate;

        @JsonProperty("podatekVAT")
        private String vatTax;

        @JsonProperty("wartośćBrutto")
        private String gross;
}
