package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    // PERSONAL INFO
    private String name;
    private String email;
    private String contact;
    private String birthday;

    // ACCOUNT INFO
    private String username;
    private String password;
    private Role role;

    public User toEntity() {
        return User.builder()
                .role(this.role)
                .name(this.name)
                .email(this.email)
                .contact(this.contact)
                .username(this.username)
                .password(this.password)
                .birthday(LocalDate.parse(this.birthday))
                .build();
    }
}
