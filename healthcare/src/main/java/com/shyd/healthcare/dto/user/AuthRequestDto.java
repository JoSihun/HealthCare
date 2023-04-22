package com.shyd.healthcare.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestDto {
    private String username;
    private String password;
}
