package com.scanner.entity.document;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
}
