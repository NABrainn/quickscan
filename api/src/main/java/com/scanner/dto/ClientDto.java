package com.scanner.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.Data;

@Data
public class ClientDto {

    @JsonProperty("nazwa")
    private String name;

    @JsonProperty("nip")
    private String nip;

    @JsonProperty("adres")
    private String address;
}
