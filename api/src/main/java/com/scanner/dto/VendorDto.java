package com.scanner.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class VendorDto {
    @JsonProperty("nazwa")
    private String name;

    @JsonProperty("nip")
    private String nip;

    @JsonProperty("adres")
    private String address;
}
