package com.shyd.healthcare.repository.user;

import com.shyd.healthcare.domain.user.Auth;
import com.shyd.healthcare.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUser(User user);
    Optional<Auth> findByAccessToken(String accessToken);
    Optional<Auth> findByRefreshToken(String refreshToken);

    Boolean existsByUser(User user);
    Boolean existsByAccessToken(String accessToken);
    Boolean existsByRefreshToken(String refreshToken);
}
