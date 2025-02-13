package com.scanner.mapper;

import com.scanner.dto.SignUpDto;
import com.scanner.dto.UserDto;
import com.scanner.entity.User;
import com.scanner.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);
}
