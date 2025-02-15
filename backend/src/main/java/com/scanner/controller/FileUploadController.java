package com.scanner.controller;

import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.fileUpload.FileUploadException;
import com.scanner.service.fileUpload.FileUploadService;
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
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

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
            consumes = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> process(
            @Valid @RequestParam("file")MultipartFile file,
            @RequestParam("name") String name
            ) {
        FileUploadRequestDto fileUploadRequest = new FileUploadRequestDto(file, name);
        try {
            return ResponseEntity.ok(fileUploadService.process(fileUploadRequest));
        }
        catch(FileUploadException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nie udało się przeprocesować pliku.");
        }
    }
}
