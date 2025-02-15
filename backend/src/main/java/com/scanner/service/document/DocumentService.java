package com.scanner.service.document;

import com.scanner.entity.document.Document;
import com.scanner.repository.document.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;

    public Document saveDocument(Document document) {
        try {
            return documentRepository.save(document);
        }
        catch (DataIntegrityViolationException e) {
            throw new DocumentServiceException("Nip klienta/sprzedawcy istnieje w systemie.", HttpStatus.NOT_FOUND);
        }
    }

    public Document getDocumentById(long id) {
        return documentRepository.findById(id).orElseThrow(() -> new DocumentServiceException("Document not found.", HttpStatus.NOT_FOUND));
    }

    public Page<Document> getAllDocuments(String createdBy, Pageable pageable) {
        return documentRepository.findByCreatedBy(createdBy, pageable);
    }

    public void deleteDocument(long id) {
        documentRepository.deleteById(id);
    }
}
