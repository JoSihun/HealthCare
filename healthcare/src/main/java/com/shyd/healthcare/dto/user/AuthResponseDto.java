package com.shyd.healthcare.dto.user;

import com.shyd.healthcare.domain.user.Auth;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String tokenType;
    private String accessToken;
    private String refreshToken;

    public AuthResponseDto(Auth entity) {
        this.tokenType = entity.getTokenType();
        this.accessToken = entity.getAccessToken();
        this.refreshToken = entity.getRefreshToken();
    }
}
