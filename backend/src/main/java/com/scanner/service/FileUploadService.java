package com.scanner.service;

import com.scanner.dto.FileUploadRequest;
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

    @Autowired
    public FileUploadService(ImageProcessor imageProcessor, TesseractService tesseractService, ChatService chatService) {
        this.imageProcessor = imageProcessor;
        this.tesseractService = tesseractService;
        this.chatService = chatService;
    }

    public String process(FileUploadRequest fileUploadRequest) throws TesseractException, IOException {
        BufferedImage image = ImageIO.read(fileUploadRequest.file().getInputStream());
        BufferedImage resizedImage = imageProcessor.resizeImage(image, 3.3);
        String result = tesseractService.doOCR(resizedImage);
        return chatService.generateContent(result);
    }
}
