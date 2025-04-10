package com.scanner.service.documentService;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class DocumentServiceException extends RestException {

    public DocumentServiceException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause, httpStatus);
    }

    public DocumentServiceException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
