package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Auth;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";

    @Builder
    public AuthResponseDto(Auth entity) {
        this.tokenType = entity.getTokenType();
        this.accessToken = entity.getAccessToken();
        this.refreshToken = entity.getRefreshToken();
    }
}
