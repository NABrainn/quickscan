package com.scanner.service;

import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.repository.document.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;

    @Autowired
    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    public Document saveDocument(Document document) {
        return documentRepository.save(document);
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
