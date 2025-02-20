package com.scanner.entity.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.product.ReceiptProduct;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@Entity
@Table(name = "receipts")
public class Receipt extends Document{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

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
    @OneToMany(mappedBy = "receipt")
    private Set<ReceiptProduct> products;

    @Override
    public String toString() {
        return "Receipt{" +
                "id=" + id +
                ", purchaseDate=" + purchaseDate +
                ", storeName='" + storeName + '\'' +
                ", totalAmount=" + totalAmount +
                ", products=" + products +
                '}';
    }
}
