package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private Role role = Role.ROLE_USER;
    private String email;
    private String contact;
    private String username;
    private String password;

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
