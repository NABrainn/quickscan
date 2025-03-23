package com.scanner.dto.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@Data
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = ReceiptDto.class, name = "receipt"),
        @JsonSubTypes.Type(value = InvoiceDto.class, name = "invoice")
})
public abstract class DocumentDto {

    @JsonProperty("id")
    private long id;

}
