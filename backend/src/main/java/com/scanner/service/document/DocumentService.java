package com.scanner.service.document;

import com.scanner.entity.document.Document;
import com.scanner.repository.document.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document saveDocument(Document document) {
        try {
            return documentRepository.save(document);
        }
        catch (DataIntegrityViolationException e) {
            throw new DocumentServiceException("Nip klienta/sprzedawcy istnieje w systemie.");
        }
    }

    public Document getDocumentById(long id) {
        return documentRepository.findById(id).orElseThrow(() -> new RuntimeException("Document not found."));
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public void deleteReceipt(Document document) {
        documentRepository.delete(document);
    }
}
