package com.scanner.service.document;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class DocumentServiceException extends RestException {
    public DocumentServiceException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
