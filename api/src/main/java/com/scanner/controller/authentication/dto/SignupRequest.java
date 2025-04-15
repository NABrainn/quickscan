package com.scanner.controller.authentication.dto;

import com.scanner.entity.user.Role;
import lombok.Data;

@Data
public class SignupRequest {

    private String username;
    private String email;
    private String password;
    private Role role;
}
