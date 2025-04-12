package com.scanner.service.jwtService;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class JwtSericeException extends RestException {
    public JwtSericeException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause, httpStatus);
    }

    public JwtSericeException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
