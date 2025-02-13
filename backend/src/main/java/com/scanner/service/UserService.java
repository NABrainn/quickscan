package com.scanner.service;

import com.scanner.dto.CredentialsDto;
import com.scanner.dto.SignUpDto;
import com.scanner.dto.UserDto;
import com.scanner.entity.User;
import com.scanner.exception.AppException;
import com.scanner.mapper.UserMapper;
import com.scanner.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    public UserDto login(CredentialsDto credentialsDto) throws UsernameNotFoundException {
        User user =  userRepository.findByUsername(credentialsDto.username()).orElseThrow(() -> new AppException("Unknown user.", HttpStatus.NOT_FOUND));
        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid Password.", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto signUpDto) {
        Optional<User> byUsername = userRepository.findByUsername(signUpDto.username());

        if(byUsername.isPresent()) {
            throw new AppException("Username already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(signUpDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.password())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDto(savedUser);
    }
}
