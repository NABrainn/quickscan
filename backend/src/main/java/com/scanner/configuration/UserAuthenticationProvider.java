package com.scanner.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.scanner.dto.UserDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class UserAuthenticationProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto userDto) {
        Date now = new Date();

        Date validity = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(userDto.getUsername())
                .withIssuedAt(Instant.now())
                .withExpiresAt(validity)
                .withClaim("username", userDto.getUsername())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);
        UserDto user = UserDto.builder()
                .username(decodedJWT.getIssuer())
                .username(decodedJWT.getClaim("username").asString())
                .build();
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}