package com.scanner.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.scanner.entity.document.Invoice;
import jakarta.persistence.*;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty("nazwa")
    @Column(name = "name")
    private String name;

    @JsonProperty("nip")
    @Column(name = "nip")
    private String nip;

    @JsonProperty("adres")
    @Column(name = "address")
    private String address;

    @JsonBackReference
    @OneToOne(mappedBy = "vendor")
    private Invoice invoice;

    @Override
    public String toString() {
        return "Vendor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nip='" + nip + '\'' +
                ", address='" + address + '\'' +
                ", invoice=" + invoice +
                '}';
    }
}
