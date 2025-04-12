package com.scanner.service.authenticationService;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class AuthenticationServiceException extends RestException {
    public AuthenticationServiceException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }

    public AuthenticationServiceException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause, httpStatus);
    }
}
