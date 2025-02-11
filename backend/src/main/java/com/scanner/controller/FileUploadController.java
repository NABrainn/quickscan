package com.scanner.controller;

import com.scanner.dto.FileUploadRequest;
import com.scanner.service.FileUploadService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@Validated
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @Autowired
    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping(
            consumes = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<String> process(
            @Valid @RequestParam("file")MultipartFile file,
            @RequestParam("name") String name
            ) throws TesseractException, IOException {
        FileUploadRequest fileUploadRequest = new FileUploadRequest(file, name);

        if(!file.getContentType().equals("image/jpeg") && !file.getContentType().equals("image/png"))
            return new ResponseEntity<>("Zdjęcie musi mieć format jpg/png.", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        return ResponseEntity.ok(fileUploadService.process(fileUploadRequest));
    }
}
