package com.scanner.entity.document;

import com.scanner.entity.product.ReceiptProduct;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "receipts")
public class Receipt extends Document{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "purchase_date", nullable = true)
    private Date purchaseDate;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "total_amount")
    private double totalAmount;

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
