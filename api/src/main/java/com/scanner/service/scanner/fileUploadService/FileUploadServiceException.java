package com.scanner.service.scanner.fileUploadService;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class FileUploadServiceException extends RestException {
    public FileUploadServiceException(String message, Throwable cause,  HttpStatus httpStatus) {
        super(message, cause, httpStatus);
    }
}
