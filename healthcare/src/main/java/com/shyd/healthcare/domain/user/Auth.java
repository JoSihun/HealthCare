package com.shyd.healthcare.domain.user;

import com.shyd.healthcare.domain.BaseTime;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Auth extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String tokenType;
    @Column(nullable = false)
    private String accessToken;
    @Column(nullable = false)
    private String refreshToken;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
