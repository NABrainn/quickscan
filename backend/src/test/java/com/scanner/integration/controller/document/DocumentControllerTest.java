package com.scanner.integration.controller.document;

import com.scanner.entity.Client;
import com.scanner.entity.document.Document;
import com.scanner.entity.document.Receipt;
import com.scanner.integration.ITBase;
import com.scanner.repository.ClientRepository;
import com.scanner.repository.VendorRepository;
import com.scanner.repository.document.DocumentRepository;
import com.scanner.repository.product.InvoiceProductRepository;
import com.scanner.service.document.DocumentService;
import com.scanner.utility.DocumentTestFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class DocumentControllerTest extends ITBase {

    @Autowired
    public MockMvc mockMvc;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private InvoiceProductRepository invoiceProductRepository;

    ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        documentRepository.deleteAll();
        DocumentTestFactory.createTenInvoices().forEach(i -> documentRepository.save(i));
        DocumentTestFactory.createTenReceipts().forEach(r -> documentRepository.save(r));
    }

    @Test
    public void shouldAddNewReceipt() throws Exception {
        Document document = Receipt.builder()
                .storeName("biedronka")
                .totalAmount(21.37)
                .build();
        String json = mapper.writeValueAsString(document);
        mockMvc.perform(post("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());
        assertThat(documentRepository.findAll().size()).isEqualTo(21);

    }

    @Test
    public void shouldAddNewInvoice() throws Exception {
        Document document = DocumentTestFactory.createInvoice();
        String json = mapper.writeValueAsString(document);
        mockMvc.perform(post("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists());
        assertThat(documentRepository.findAll().size()).isEqualTo(21);
    }


    @Test
    public void shouldGetAllDocuments() throws Exception {
        mockMvc.perform(get("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .accept("application/json")
                        .contentType("application/json"))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldDeleteDocument() throws Exception {
        Document existingDocument = documentRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No document found!"));
        long idToDelete = existingDocument.getId();

        mockMvc.perform(delete("/api/documents/" + idToDelete)
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .accept("application/json")
                        .contentType("application/json"))
                .andExpect(status().isOk());

    }
    @Test
    public void shouldNotDeleteDocument() throws Exception {
        int idToDelete = 1;
        mockMvc.perform(delete("/api/documents/" + idToDelete)
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .accept("application/json")
                        .contentType("application/json"))
                .andExpect(status().isNotFound());

    }

    @Test
    public void shouldNotUpdateDocument() throws Exception {
        String badJson = """
                {
                    "foo": "bar"
                }
                """;
        mockMvc.perform(put("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .accept("application/json")
                        .content(badJson)
                        .contentType("application/json"))
                .andExpect(status().isBadRequest());

    }

    @Test
    public void shouldUpdateDocument() throws Exception {
        Document existingDocument = documentRepository.findAll().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No document found!"));
        String json = mapper.writeValueAsString(existingDocument);

        mockMvc.perform(put("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .accept("application/json")
                        .content(json)
                        .contentType("application/json"))
                .andExpect(status().isOk());

    }

    @Test
    public void shouldAddDocumentWithMappings() throws Exception {
        Document document = DocumentTestFactory.createInvoiceWithMappings();
        String json = mapper.writeValueAsString(document);

        mockMvc.perform(post("/api/documents")
                        .with(jwt()
                                .jwt(jwt -> jwt.subject("testUser")))
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.odbiorca").exists())
                .andExpect(jsonPath("$.sprzedawca").exists())
                .andExpect(jsonPath("$.produkty").exists());
        assertThat(documentRepository.findAll().size()).isEqualTo(21);
        assertThat(vendorRepository.findAll().size()).isEqualTo(1);
        assertThat(clientRepository.findAll().size()).isEqualTo(1);
        assertThat(invoiceProductRepository.findAll().size()).isEqualTo(1);
    }
}
