package com.scanner.service.userDetailsService;

import com.scanner.exception.RestException;
import org.springframework.http.HttpStatus;

public class UserDetailsServiceException extends RestException {
    public UserDetailsServiceException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause, httpStatus);
    }

    public UserDetailsServiceException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
