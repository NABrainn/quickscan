package com.scanner.service.authenticationService;

import com.scanner.controller.authentication.dto.*;
import com.scanner.entity.user.EntityUser;
import com.scanner.repository.UserRepository;
import com.scanner.service.jwtService.JwtService;
import com.scanner.service.jwtService.TokenPair;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public void signup(SignupRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            EntityUser user = EntityUser.builder()
                    .username(request.username())
                    .email(request.email())
                    .password(passwordEncoder.encode(request.password()))
                    .role(request.role())
                    .build();
            userRepository.save(user);
        }
        throw new AuthenticationServiceException("User with that name already exists", HttpStatus.BAD_REQUEST);
    }

    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new LoginResponse(jwtService.generateTokenPair(authentication));
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.refreshToken();

        if(!jwtService.isRefreshToken(refreshToken)) {
            throw new AuthenticationServiceException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }
        String username;
        Optional<String> optionalUsername = jwtService.extractUsername(refreshToken);
        if(optionalUsername.isPresent()) {
            username = optionalUsername.get();
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            String accessToken = jwtService.generateAccessToken(authenticationToken);
            return new RefreshTokenResponse(new TokenPair(accessToken, refreshToken));
        }
        throw new AuthenticationServiceException("User does not exist", HttpStatus.NOT_FOUND);
    }
}
