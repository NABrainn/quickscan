package com.scanner.service.scanner.fileUploadService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scanner.dto.document.DocumentDto;
import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.chatService.ChatService;
import com.scanner.utility.StringUtils;
import io.github.amithkoujalgi.ollama4j.core.exceptions.OllamaBaseException;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class FileUploadService {

    private final ChatService chatService;
    private final ObjectMapper objectMapper;
    private static final Logger logger = LoggerFactory.getLogger(FileUploadService.class);

    public DocumentDto process(FileUploadRequestDto fileUploadRequest) {
        String jsonContent = generateContent(fileUploadRequest);
        return parseDocument(StringUtils.jsonFromText(jsonContent));
    }

    private String generateContent(FileUploadRequestDto request) {
        try {
            var multipartFileName = request.file().getOriginalFilename();
            String extension = "";
            if (multipartFileName != null && multipartFileName.contains(".")) {
                extension = multipartFileName.substring(multipartFileName.lastIndexOf("."));
            }
            File file = File.createTempFile("image", extension);
            request.file().transferTo(file);
            return chatService.generateContent(file);
        } catch (RuntimeException | IOException | OllamaBaseException | InterruptedException e) {
            throw new FileUploadServiceException("Nie udało się wygenerować treści, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private DocumentDto parseDocument(String json) {
        try {
            return objectMapper.readValue(json, DocumentDto.class);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
            throw new FileUploadServiceException("Nie udało się wygenerować dokumentu, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }
}
