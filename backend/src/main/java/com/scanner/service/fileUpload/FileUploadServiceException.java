package com.scanner.service.fileUpload;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class FileUploadServiceException extends RestException {
    public FileUploadServiceException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
