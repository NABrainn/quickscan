package com.scanner.integration.controller.fileUpload;

import com.scanner.controller.FileUploadController;
import com.scanner.integration.ITBase;
import com.scanner.service.FileUploadService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FileUploadController.class)
@AutoConfigureMockMvc
public class FileUploadControllerMock extends ITBase {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FileUploadService fileUploadService;


    @Test
    void shouldAcceptJPG() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "file content".getBytes()
        );

        mockMvc.perform(
                multipart("/api/upload")
                        .file(file)
                        .param("name", "passedName")
                        .contentType("image/jpeg")
                        .accept("application/json")
                )
                .andExpectAll(
                        status().isOk()
                );
    }

    @Test
    void shouldAcceptPNG() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "file content".getBytes()
        );

        mockMvc.perform(
                        multipart("/api/upload")
                                .file(file)
                                .param("name", "passedName")
                                .contentType("image/png")
                                .accept("application/json")
                )
                .andExpectAll(
                        status().isOk()
                );
    }

    @Test
    void shouldRejectUnsupportedMediaTypes() throws Exception {
        MockMultipartFile file1 = new MockMultipartFile(
                "file1",
                "test.gif",
                "image/gif",
                "file content".getBytes()
        );

        MockMultipartFile file2 = new MockMultipartFile(
                "file2",
                "test.html",
                "text/html",
                "file content".getBytes()
        );

        MockMultipartFile file3 = new MockMultipartFile(
                "file3",
                "test.js",
                "text/javascript",
                "file content".getBytes()
        );

        mockMvc.perform(
                        multipart("/api/upload")
                                .file(file1)
                                .param("name", "passedName")
                                .contentType("image/gif")
                                .accept("application/json")
                )
                .andExpectAll(
                        status().isUnsupportedMediaType()
                );
        mockMvc.perform(
                        multipart("/api/upload")
                                .file(file2)
                                .param("name", "passedName")
                                .contentType("text/html")
                                .accept("application/json")
                )
                .andExpectAll(
                        status().isUnsupportedMediaType()
                );
        mockMvc.perform(
                        multipart("/api/upload")
                                .file(file3)
                                .param("name", "passedName")
                                .contentType("text/js")
                                .accept("application/json")
                )
                .andExpectAll(
                        status().isUnsupportedMediaType()
                );
    }
}
