package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String role;
    private String email;
    private String contact;
    private String username;

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.contact = entity.getContact();
        this.username = entity.getUsername();
        this.role = entity.getRole().name();
    }
}
