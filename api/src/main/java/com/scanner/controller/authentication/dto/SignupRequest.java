package com.scanner.controller.authentication.dto;

import com.scanner.entity.user.Role;

public record SignupRequest(String username, String email, String password, Role role) {
}
