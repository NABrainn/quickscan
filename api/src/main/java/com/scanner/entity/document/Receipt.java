package com.scanner.entity.document;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.product.ReceiptProduct;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "receipts")
public class Receipt extends Document{

    @JsonProperty("type")
    private final String type = "receipt";

    @JsonProperty("dataZakupu")
    @Column(name = "purchase_date")
    private String purchaseDate;

    @JsonProperty("nazwaSklepu")
    @Column(name = "store_name")
    private String storeName;

    @JsonProperty("kwotaCałkowita")
    @Column(name = "total_amount")
    private String totalAmount;

    @JsonProperty("produkty")
    @JsonManagedReference
    @Fetch(FetchMode.JOIN)
    @OneToMany(mappedBy = "receipt", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReceiptProduct> products;

    @Override
    public String toString() {
        return "Receipt{" +
                ", purchaseDate=" + purchaseDate +
                ", storeName='" + storeName + '\'' +
                ", totalAmount=" + totalAmount +
                ", products=" + products +
                '}';
    }
}
