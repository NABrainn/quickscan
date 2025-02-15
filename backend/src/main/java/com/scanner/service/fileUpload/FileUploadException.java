package com.scanner.service.fileUpload;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class FileUploadException extends RestException {
    public FileUploadException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
