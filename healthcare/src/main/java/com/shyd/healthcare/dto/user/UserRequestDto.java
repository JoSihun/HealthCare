package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserRequestDto {
    private Role role;
    private String email;
    private String contact;
    private String username;
    private String password;

    @Builder
    public UserRequestDto(String email, String contact, String username, String password, Role role) {
        this.role = role;
        this.email = email;
        this.contact = contact;
        this.username = username;
        this.password = password;
    }

    public User toEntity() {
        return User.builder()
                .role(this.role)
                .email(this.email)
                .contact(this.contact)
                .username(this.username)
                .password(this.password)
                .build();
    }
}
