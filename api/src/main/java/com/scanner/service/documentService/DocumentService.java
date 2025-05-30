package com.scanner.service.documentService;

import com.scanner.dto.document.DocumentDto;
import com.scanner.dto.document.InvoiceDto;
import com.scanner.dto.document.ReceiptDto;
import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.entity.product.InvoiceProduct;
import com.scanner.entity.product.ReceiptProduct;
import com.scanner.repository.document.DocumentPagingAndSortingRepository;
import com.scanner.repository.document.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final ModelMapper modelMapper;
    private final DocumentRepository documentRepository;
    private final DocumentPagingAndSortingRepository documentPagingAndSortingRepository;

    public DocumentDto saveDocument(Document document) {
        try {
            if (document instanceof Receipt receipt) {
                Set<ReceiptProduct> products = receipt.getProducts();
                if (products != null) {
                    products.forEach(product -> product.setReceipt(receipt));
                }
                return modelMapper.map(documentRepository.save(document), ReceiptDto.class);
            }
            else {
                Invoice invoice = (Invoice) document;
                Set<InvoiceProduct> products = invoice.getProducts();
                if (products != null) {
                    products.forEach(product -> product.setInvoice(invoice));
                }
                return modelMapper.map(documentRepository.save(document), InvoiceDto.class);
            }
        } catch (DataIntegrityViolationException e) {
            throw new DocumentServiceException("Nip klienta/sprzedawcy istnieje w systemie.", HttpStatus.NOT_FOUND);
        }
    }

    public DocumentDto getDocumentById(long id) {
        Document found = documentRepository.findById(id).orElseThrow(() -> new DocumentServiceException("Document not found.", HttpStatus.NOT_FOUND));
        if (found instanceof Invoice)
            return modelMapper.map(found, InvoiceDto.class);
        return modelMapper.map(found, ReceiptDto.class);
    }

    public Page<DocumentDto> getDocumentPage(String createdBy, Pageable pageable) {
        Page<Document> page = documentPagingAndSortingRepository.findByCreatedBy(createdBy, pageable);
        return page.map(this::convertToDto);
    }

    public void deleteDocument(long id) {
        documentRepository.deleteById(id);
    }
    private DocumentDto convertToDto(Document document) {
        if (document instanceof Invoice) {
            return modelMapper.map(document, InvoiceDto.class);
        } else if (document instanceof Receipt) {
            return modelMapper.map(document, ReceiptDto.class);
        }
        throw new IllegalArgumentException("Unknown document type: " + document.getClass().getName());
    }
}
