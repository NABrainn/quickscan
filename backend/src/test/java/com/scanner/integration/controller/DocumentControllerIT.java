package com.scanner.integration.controller;

import com.scanner.entity.document.Document;
import com.scanner.entity.document.Invoice;
import com.scanner.entity.document.Receipt;
import com.scanner.integration.ITBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Date;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class DocumentControllerIT extends ITBase {

    @Autowired
    public MockMvc mockMvc;

    ObjectMapper mapper = new ObjectMapper();

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
    }

    @Test
    public void shouldAddNewInvoice() throws Exception {
        Document document = Invoice.builder()
                .invoiceNumber("847254")
                .bankAccountNumber("92836342")
                .issueDate(new Date())
                .currency("ZŁ")
                .paymentMethod("KARTA")
                .saleDate(new Date())
                .totalGross(2100)
                .totalRate(3939)
                .totalNetto(393)
                .totalTax(32)
                .build();
        String json = mapper.writeValueAsString(document);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/documents")
                        .contentType("application/json")
                        .content(json)
                        .accept("application/json"))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
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
