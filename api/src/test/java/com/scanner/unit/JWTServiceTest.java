package com.scanner.unit;

import com.scanner.service.jwtService.JwtService;
import com.scanner.service.jwtService.TokenPair;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;


@Slf4j
@SpringBootTest
public class JWTServiceTest {

    @Autowired
    private JwtService jwtService;

    @Test
    public void generateTokenPairTest() {
        UserDetails userDetails = new User("testuser", "password", Collections.emptyList());
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        TokenPair tokenPair = jwtService.generateTokenPair(authentication);

        log.info("access token: {}", tokenPair.accessToken());
        log.info("refresh token: {}", tokenPair.refreshToken());
        log.info("secret {}", jwtService.getSecret());
        log.info("principal: {}", ((UserDetails )authentication.getPrincipal()).getUsername());
        assertNotNull(tokenPair.accessToken(), "Access token should not be null");
        assertNotNull(jwtService.getSecret(), "Secret should not be null");
        assertTrue(jwtService.isRefreshToken(tokenPair.refreshToken()), "should be refresh token");
        assertFalse(jwtService.isRefreshToken(tokenPair.accessToken()), "should not be refresh token");

        assertFalse(jwtService.extractAllClaims(tokenPair.accessToken()).isEmpty(), "Claims should not be empty");
        assertFalse(jwtService.extractUsername(tokenPair.accessToken()).isEmpty(), "Username should not be empty");
    }
}
