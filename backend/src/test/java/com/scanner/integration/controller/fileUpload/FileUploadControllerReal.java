package com.scanner.integration.controller.fileUpload;

import com.scanner.dto.InvoiceDto;
import com.scanner.dto.ReceiptDto;
import com.scanner.integration.ITBase;
import com.scanner.service.DocumentService;
import com.scanner.service.fileUpload.FileUploadService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;

import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class FileUploadControllerReal extends ITBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private DocumentService documentService;

    ObjectMapper mapper = new ObjectMapper();

    @Test
    void shouldReturnReceiptJson() throws Exception {
        byte[] imageBytes = Files.readAllBytes(Paths.get("src/test/resources/biedronka.jpg"));
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "biedronka.jpg",
                "image/jpeg",
                imageBytes
        );

        MvcResult result = mockMvc.perform(
                        multipart("/api/upload")
                                .file(file)
                                .param("name", "passedName")
                                .contentType("image/jpeg")
                                .accept("application/json")
                )
                .andExpectAll(
                        status().isOk()
                )
                .andDo(print())
                .andReturn();
        String response = result.getResponse().getContentAsString();
        ReceiptDto receiptJson = mapper.readValue(response, ReceiptDto.class);

        assertNotNull(receiptJson, "response cannot be null");
        assertThrowsExactly(UnrecognizedPropertyException.class, () -> mapper.readValue(response, InvoiceDto.class));
    }
}
