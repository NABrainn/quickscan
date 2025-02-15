package com.scanner.repository.document;

import com.scanner.entity.document.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    Page<Document> findByCreatedBy(String createdBy, Pageable pageable);
}
