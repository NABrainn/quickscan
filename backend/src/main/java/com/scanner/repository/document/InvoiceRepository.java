package com.scanner.repository.document;

import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {
    List<Invoice> findByCreatedBy(String createdBy);
}
