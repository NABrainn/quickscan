package com.scanner.integration.controller.document;

import com.scanner.entity.document.Document;
import com.scanner.entity.document.Receipt;
import com.scanner.integration.ITBase;
import com.scanner.repository.document.DocumentRepository;
import com.scanner.service.DocumentService;
import com.scanner.utility.DocumentTestFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class DocumentControllerReal extends ITBase {

    @Autowired
    public MockMvc mockMvc;

    @Autowired
    private DocumentService documentService;

    @Autowired
    private DocumentRepository documentRepository;

    ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        documentRepository.deleteAll();
    }

    @Test
    public void shouldAddNewReceipt() throws Exception {
        Document document = Receipt.builder()
                .storeName("biedronka")
                .totalAmount(21.37)
                .build();
        String json = mapper.writeValueAsString(document);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/documents")
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
        assertThat(documentService.getAllDocuments().size()).isEqualTo(1);
    }

    @Test
    public void shouldAddNewInvoice() throws Exception {
        Document document = DocumentTestFactory.createInvoice();
        String json = mapper.writeValueAsString(document);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/documents")
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
        assertThat(documentRepository.findAll().size()).isEqualTo(1);
        assertThat(documentService.getAllDocuments().size()).isEqualTo(1);
    }


    @Test
    public void shouldGetAllDocuments() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/documents")
                        .accept("application/json")
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(0)));
    }
}
