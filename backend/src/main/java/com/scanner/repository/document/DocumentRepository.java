package com.scanner.repository.document;

import com.scanner.entity.document.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
