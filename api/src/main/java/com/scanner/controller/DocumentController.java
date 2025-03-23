package com.scanner.controller;

import com.scanner.dto.document.DocumentDto;
import com.scanner.entity.document.Document;
import com.scanner.service.documentService.DocumentService;
import com.scanner.service.documentService.DocumentServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping
    public ResponseEntity<DocumentDto> addDocument(@RequestBody Document document, Authentication authentication) {
        try {
            document.setCreatedBy(authentication.getName());
            return ResponseEntity.ok(documentService.saveDocument(document));
        }
        catch (DocumentServiceException e) {
            throw new ResponseStatusException(e.getHttpStatus(), "Dokument zawiera błędne dane.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable long id) {
        try {
            return ResponseEntity.ok(documentService.getDocumentById(id));
        }
        catch (DocumentServiceException e) {
            throw new ResponseStatusException(e.getHttpStatus(), "Dokument nie istnieje.");
        }
    }

    @GetMapping
    public Page<DocumentDto> getDocumentPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "false") boolean ascending,
            Authentication authentication) {
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return documentService.getDocumentPage(authentication.getName(), pageable);
    }

    @PutMapping
    public ResponseEntity<DocumentDto> updateDocument(@RequestBody Document document, Authentication authentication) {
        try {
            document.setCreatedBy(authentication.getName());
            return ResponseEntity.ok(documentService.saveDocument(document));
        }
        catch (DocumentServiceException e) {
            throw new ResponseStatusException(e.getHttpStatus(), e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok("Dokument pomyślnie usunięty.");
        }
        catch (DocumentServiceException e) {
            throw new ResponseStatusException(e.getHttpStatus(), e.getMessage());
        }
    }
}
