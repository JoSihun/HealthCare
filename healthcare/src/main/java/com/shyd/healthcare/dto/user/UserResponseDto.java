package com.shyd.healthcare.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String contact;
    private String username;
    private String birthday;

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.contact = entity.getContact();
        this.username = entity.getUsername();
        this.birthday = entity.getBirthday().toString();
    }
}
