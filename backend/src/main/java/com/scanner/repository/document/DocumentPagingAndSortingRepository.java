package com.scanner.repository.document;

import com.scanner.entity.document.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentPagingAndSortingRepository extends PagingAndSortingRepository<Document, Long> {
    Page<Document> findByCreatedBy(String createdBy, Pageable pageable);
}
