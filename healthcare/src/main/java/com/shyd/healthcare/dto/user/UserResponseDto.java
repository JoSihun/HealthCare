package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.User;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private Long userId;
    private String accessToken;
    private String tokenType = "Bearer";

    @Builder
    public UserResponseDto(User entity) {

    }
}
