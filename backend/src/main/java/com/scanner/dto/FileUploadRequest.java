package com.scanner.dto;

import org.springframework.web.multipart.MultipartFile;

public record FileUploadRequest(
        MultipartFile file,
        String name
) {
}
