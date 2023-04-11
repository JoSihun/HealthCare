package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private Role role;
    private String email;
    private String username;
    private String password;

    public User toEntity() {
        return User.builder()
                .role(this.role)
                .email(this.email)
                .username(this.username)
                .password(this.password)
                .build();
    }
}
