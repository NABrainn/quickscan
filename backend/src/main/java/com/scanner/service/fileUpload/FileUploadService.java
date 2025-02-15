package com.scanner.service.fileUpload;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.scanner.dto.DocumentDto;
import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.ChatService;
import com.scanner.service.ImageProcessor;
import com.scanner.service.TesseractService;
import net.sourceforge.tess4j.TesseractException;
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
        BufferedImage image = readImage(fileUploadRequest);
        BufferedImage resizedImage = imageProcessor.resizeImage(image, 3.3);
        String ocrResult = performOCR(resizedImage);
        String jsonContent = chatService.generateContent(ocrResult);
        return parseDocument(jsonContent);
    }

    private BufferedImage readImage(FileUploadRequestDto request) {
        try {
            return ImageIO.read(request.file().getInputStream());
        } catch (IOException e) {
            throw new FileUploadException("Nie udało się przeczytać pliku.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String performOCR(BufferedImage image) {
        try {
            return tesseractService.doOCR(image);
        } catch (TesseractException e) {
            throw new FileUploadException("Nie udało się zeskanować pliku.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private DocumentDto parseDocument(String json) {
        try {
            return objectMapper.readValue(json, DocumentDto.class);
        } catch (JsonProcessingException e) {
            throw new FileUploadException("Nie udało się przeprocesować pliku json.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
