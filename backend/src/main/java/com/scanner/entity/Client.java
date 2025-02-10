package com.scanner.entity;

import com.scanner.entity.document.Invoice;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nip")
    private String nip;

    @Column(name = "address")
    private String address;

    @OneToOne(mappedBy = "client")
    private Invoice invoice;

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nip='" + nip + '\'' +
                ", address='" + address + '\'' +
                ", invoice=" + invoice +
                '}';
    }
}
