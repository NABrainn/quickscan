package com.scanner.entity;

import com.scanner.entity.document.Invoice;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nip")
    private String nip;

    @Column(name = "address")
    private String address;

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
