package com.scanner.integration.scanner;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.scanner.dto.FileUploadRequestDto;
import com.scanner.dto.document.DocumentDto;
import com.scanner.dto.document.ReceiptDto;
import com.scanner.integration.IntegrationTestBase;
import com.scanner.service.scanner.fileUploadService.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.nio.file.Files;
import java.util.logging.LogManager;


@SpringBootTest
public class FileUploadServiceTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FileUploadService fileUploadService;
    private Logger logger = LoggerFactory.getLogger(FileUploadServiceTest.class);

    @AfterEach
    public void sleep() throws InterruptedException {
        Thread.sleep(15000);
    }

    @Test
    public void testBiedronka() throws Exception {
        var resource = new ClassPathResource("biedronka.jpg");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "biedronka.jpg",
                "image/jpeg",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "biedronka"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }

    @Test
    public void testFaktura() throws Exception {
        var resource = new ClassPathResource("faktura.png");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "faktura.png",
                "image/png",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "faktura"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }

    @Test
    public void testFaktura1() throws Exception {
        var resource = new ClassPathResource("faktura1.png");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "faktura1.png",
                "image/png",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "faktura1"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }

    @Test
    public void testFaktura3() throws Exception {
        var resource = new ClassPathResource("faktura3.png");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "faktura3.png",
                "image/png",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "faktura3"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }

    @Test
    public void rossmann() throws Exception {
        var resource = new ClassPathResource("rossmann.png");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "rossmann.png",
                "image/png",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "rossmann"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }
    @Test

    public void stokrotka() throws Exception {
        var resource = new ClassPathResource("stokrotka.png");
        byte[] content = Files.readAllBytes(resource.getFile().toPath());

        var file = new MockMultipartFile(
                "file",
                "rossmann.png",
                "image/png",
                content
        );

        DocumentDto processed = fileUploadService.process(new FileUploadRequestDto(file, "stokrotka"));

        mockMvc.perform(multipart("/api/upload")
                        .file(file)
                        .param("name", file.getName())
                        .with(jwt())
                )
                .andExpect(status().isOk());

        if(processed instanceof ReceiptDto)
            logger.info(() -> "\nprocessed receipt: " + processed);
        else
            logger.info(() -> "\nprocessed invoice: " + processed);
    }
}
