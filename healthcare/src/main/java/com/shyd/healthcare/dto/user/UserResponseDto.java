package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
public class UserResponseDto {
    private Long id;
    private String role;
    private String email;
    private String username;
    private String accessToken;
    private String tokenType = "Bearer";

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.role = entity.getRole().name();
        this.email = entity.getEmail();
        this.username = entity.getUsername();
    }
}
