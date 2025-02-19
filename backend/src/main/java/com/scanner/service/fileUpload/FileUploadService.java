package com.scanner.service.fileUpload;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scanner.dto.DocumentDto;
import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.ChatService;
import com.scanner.service.ImageProcessor;
import com.scanner.service.TesseractService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.ai.retry.NonTransientAiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;

@Service
public class FileUploadService {

    private final ImageProcessor imageProcessor;
    private final TesseractService tesseractService;
    private final ChatService chatService;
    private final ObjectMapper objectMapper;

    @Autowired
    public FileUploadService(ImageProcessor imageProcessor, TesseractService tesseractService, ChatService chatService) {
        this.imageProcessor = imageProcessor;
        this.tesseractService = tesseractService;
        this.chatService = chatService;
        this.objectMapper = new ObjectMapper();
    }

    public DocumentDto process(FileUploadRequestDto fileUploadRequest) {
        BufferedImage image = processImage(fileUploadRequest);
        String ocrResult = performOCR(image);
        String jsonContent = generateContent(ocrResult);
        return parseDocument(jsonContent);
    }


    private BufferedImage processImage(FileUploadRequestDto request) {
        try {
            BufferedImage image = ImageIO.read(request.file().getInputStream());
            return imageProcessor.resizeImage(image, 3.3);
        } catch (IOException e) {
            throw new FileUploadServiceException("Nie udało się przeczytać pliku, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private String performOCR(BufferedImage image) {
        try {
            return tesseractService.doOCR(image);
        } catch (TesseractException e) {
            throw new FileUploadServiceException("Nie udało się przeprocesować pliku, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private String generateContent(String ocrResult) {
        try {
            return chatService.generateContent(ocrResult);
        } catch (NonTransientAiException e) {
            throw new FileUploadServiceException("Nie udało się wygenerować treści, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }
    }

    private DocumentDto parseDocument(String json) {
        try {
            System.out.println("output: " + json);
            return objectMapper.readValue(json, DocumentDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new FileUploadServiceException("Nie udało się wygenerować dokumentu, spróbuj ponownie.", HttpStatus.BAD_REQUEST);
        }


    }
}
