package com.scanner.dto;

import org.springframework.web.multipart.MultipartFile;

public record FileUploadRequestDto(
        MultipartFile file,
        String name
) {
}
