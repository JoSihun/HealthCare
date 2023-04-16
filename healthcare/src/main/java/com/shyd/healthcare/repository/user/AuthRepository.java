package com.shyd.healthcare.repository.user;

import com.shyd.healthcare.domain.user.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByAccessToken(String accessToken);
}
