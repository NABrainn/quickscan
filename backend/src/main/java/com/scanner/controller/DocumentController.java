package com.scanner.controller;

import com.scanner.entity.document.Document;
import com.scanner.service.document.DocumentService;
import com.scanner.service.document.DocumentServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private DocumentService documentService;

    @Autowired
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping
    public ResponseEntity<?> saveDocument(
            @RequestBody Document document
    ) {
        try {
            return ResponseEntity.ok(documentService.saveDocument(document));
        }
        catch (DocumentServiceException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable long id) {
        return documentService.getDocumentById(id);
    }

    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteDocument(@RequestParam long id) {
        return new ResponseEntity<>("Document with id " + id + " deleted.", HttpStatus.OK);
    }
}
