package com.scanner.controller;

import com.scanner.dto.FileUploadRequestDto;
import com.scanner.service.scanner.fileUploadService.FileUploadServiceException;
import com.scanner.service.scanner.fileUploadService.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping(
            consumes = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<?> process(
            @RequestParam("file")MultipartFile file,
            @RequestParam("name") String name
            ) {
        FileUploadRequestDto fileUploadRequest = new FileUploadRequestDto(file, name);
        try {
            return ResponseEntity.ok(fileUploadService.process(fileUploadRequest));
        }
        catch(FileUploadServiceException e) {
            throw new ResponseStatusException(e.getHttpStatus(), e.getMessage());
        }
    }
}
