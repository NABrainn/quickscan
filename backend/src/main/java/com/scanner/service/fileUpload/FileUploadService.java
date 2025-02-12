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
        BufferedImage image = null;
        try {
            image = ImageIO.read(fileUploadRequest.file().getInputStream());
        } catch (IOException e) {
            throw new FileUploadException("Nie udało się przeczytać pliku.", e);
        }
        BufferedImage resizedImage = imageProcessor.resizeImage(image, 3.3);
        String result = null;
        try {
            result = tesseractService.doOCR(resizedImage);
        } catch (TesseractException e) {
            throw new FileUploadException("Nie udało się zeskanować pliku.", e);
        }
        String json =  chatService.generateContent(result);
        try {
            return objectMapper.readValue(json, DocumentDto.class);
        } catch (JsonProcessingException e) {
            throw new FileUploadException("Nie udało się przeprocesować pliku json.", e);
        }
    }
}
