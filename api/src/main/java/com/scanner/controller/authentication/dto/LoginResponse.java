package com.scanner.controller.authentication.dto;

import com.scanner.service.jwtService.TokenPair;

public record LoginResponse(TokenPair tokenPair) {
}
