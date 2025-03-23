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
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.platform.commons.logging.Logger;
import org.junit.platform.commons.logging.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;


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
    public void testConcurrentPromptRequests() throws Exception {

        int numRequests = 12;
        ExecutorService executorService = Executors.newFixedThreadPool(12);
        List<Future<ResultActions>> futures = new ArrayList<>();

        var biedronkaImg = new ClassPathResource("biedronka.jpg");
        byte[] biedronkaContent = Files.readAllBytes(biedronkaImg.getFile().toPath());

        var mockPartFileBiedronka = new MockMultipartFile(
                "file",
                "biedronka.jpg",
                "image/jpeg",
                biedronkaContent
        );

        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileBiedronka)
                            .param("name", mockPartFileBiedronka.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }

        var fakturaImg = new ClassPathResource("faktura.png");
        byte[] fakturaContent = Files.readAllBytes(fakturaImg.getFile().toPath());

        var mockPartFileFaktura = new MockMultipartFile(
                "file",
                "faktura.png",
                "image/jpeg",
                fakturaContent
        );

        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileFaktura)
                            .param("name", mockPartFileFaktura.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }

        var faktura1Img = new ClassPathResource("faktura1.png");
        byte[] faktura1Content = Files.readAllBytes(faktura1Img.getFile().toPath());

        var mockPartFileFaktura1 = new MockMultipartFile(
                "file",
                "faktura1.png",
                "image/jpeg",
                faktura1Content
        );

        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileFaktura1)
                            .param("name", mockPartFileFaktura1.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }

        var faktura3Img = new ClassPathResource("faktura3.png");
        byte[] faktura3Content = Files.readAllBytes(faktura3Img.getFile().toPath());

        var mockPartFileFaktura3 = new MockMultipartFile(
                "file",
                "faktura3.png",
                "image/jpeg",
                faktura3Content
        );

        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileFaktura3)
                            .param("name", mockPartFileFaktura3.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }

        var rossmannImg = new ClassPathResource("rossmann.png");
        byte[] rossmannContent = Files.readAllBytes(rossmannImg.getFile().toPath());

        var mockPartFileRossmann = new MockMultipartFile(
                "file",
                "rossmann.png",
                "image/jpeg",
                rossmannContent
        );

        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileRossmann)
                            .param("name", mockPartFileRossmann.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }

        var stokrotkaImg = new ClassPathResource("stokrotka.png");
        byte[] stokrotkaContent = Files.readAllBytes(stokrotkaImg.getFile().toPath());

        var mockPartFileStokrotka = new MockMultipartFile(
                "file",
                "stokrotka.png",
                "image/jpeg",
                stokrotkaContent
        );
        for(int i = 0; i <= 1; i++) {
            futures.add(executorService.submit(() -> {
                try {
                    return mockMvc.perform(multipart("/api/upload")
                            .file(mockPartFileStokrotka)
                            .param("name", mockPartFileStokrotka.getName())
                            .with(jwt())
                    ).andDo(print()).andExpect(status().isOk());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }));
        }
        futures.forEach(future -> {
            try {
                future.get();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
        executorService.shutdown();
    }

}

