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
import org.springframework.security.core.AuthenticationException;
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

    public SignupResponse signup(SignupRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isEmpty()) {
            EntityUser user = EntityUser.builder()
                    .username(request.getUsername())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .build();
            userRepository.save(user);
            return new SignupResponse("Użytkownik zarejestrowany pomyślnie");
        }
        throw new AuthenticationServiceException("Użytkownik o tej nazwie już istnieje", HttpStatus.BAD_REQUEST);
    }

    public LoginResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new LoginResponse(jwtService.generateTokenPair(authentication));
        } catch (AuthenticationException e) {
            switch (e.getMessage().toLowerCase()) {
                case "bad credentials" -> throw new AuthenticationServiceException("Nieprawidłowe hasło", HttpStatus.FORBIDDEN);
                case "user not found" -> throw new AuthenticationServiceException("Użytkownik nie istnieje", HttpStatus.FORBIDDEN);
            }
            throw new AuthenticationServiceException("Nieznany błąd", HttpStatus.BAD_REQUEST);
        }
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.refreshToken();

        if(!jwtService.isRefreshToken(refreshToken)) {
            throw new AuthenticationServiceException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }
        Optional<String> optionalUsername = jwtService.extractUsername(refreshToken);
        if(optionalUsername.isPresent()) {
            String username = optionalUsername.get();
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            String accessToken = jwtService.generateAccessToken(authenticationToken);
            return new RefreshTokenResponse(new TokenPair(accessToken, refreshToken));
        }
        throw new AuthenticationServiceException("Użytkownik nie istnieje", HttpStatus.NOT_FOUND);
    }
}
