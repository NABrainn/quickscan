package com.scanner.service.scanner.fileUploadService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scanner.dto.document.DocumentDto;
import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.chatService.ChatService;
import com.scanner.service.chatService.ContentType;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.ai.retry.NonTransientAiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class FileUploadService {

    private final ImageProcessor imageProcessor;
    private final Tesseract tesseract;
    private final ChatService chatService;
    private final ObjectMapper objectMapper;

    public DocumentDto process(FileUploadRequestDto fileUploadRequest) {
        BufferedImage image = processImage(fileUploadRequest);
        String ocrResult = performOCR(image);
        String jsonContent = generateContent(ocrResult);
        return parseDocument(jsonContent);
    }

    private BufferedImage processImage(FileUploadRequestDto request) {
        try {
            BufferedImage image = ImageIO.read(request.file().getInputStream());
            imageProcessor.deskew(image);
            return image;
        } catch (IOException e) {
            throw new FileUploadServiceException("Nie udało się przeczytać pliku, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private String performOCR(BufferedImage image) {
        try {
            return tesseract.doOCR(image);
        } catch (TesseractException e) {
            throw new FileUploadServiceException("Nie udało się przeprocesować pliku, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private String generateContent(String ocrResult) {
        try {
            System.out.println(ocrResult);
            return chatService.generateContent(ocrResult, ContentType.JSON);
        } catch (NonTransientAiException e) {
            throw new FileUploadServiceException("Nie udało się wygenerować treści, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private DocumentDto parseDocument(String json) {
        try {
            return objectMapper.readValue(json, DocumentDto.class);
        } catch (JsonProcessingException e) {
            throw new FileUploadServiceException("Nie udało się wygenerować dokumentu, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }
}
