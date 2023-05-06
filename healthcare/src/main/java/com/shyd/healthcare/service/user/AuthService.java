package com.shyd.healthcare.service.user;

import com.shyd.healthcare.config.CustomUserDetails;
import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.user.Auth;
import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.user.AuthRequestDto;
import com.shyd.healthcare.dto.user.AuthResponseDto;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.repository.user.AuthRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /** 로그인 */
    @Transactional
    public AuthResponseDto login(AuthRequestDto requestDto) {
        // CHECK USERNAME AND PASSWORD
        User user = this.userRepository.findByUsername(requestDto.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. username = " + requestDto.getUsername()));
        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다. username = " + requestDto.getUsername());
        }

        // GENERATE ACCESS_TOKEN AND REFRESH_TOKEN
        String accessToken = this.jwtTokenProvider.generateAccessToken(
                new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), user.getPassword()));
        String refreshToken = this.jwtTokenProvider.generateRefreshToken(
                new UsernamePasswordAuthenticationToken(new CustomUserDetails(user), user.getPassword()));

        // CHECK IF AUTH ENTITY EXISTS, THEN UPDATE TOKEN
        if (this.authRepository.existsByUser(user)) {
            user.getAuth().updateAccessToken(accessToken);
            user.getAuth().updateRefreshToken(refreshToken);
            return new AuthResponseDto(user.getAuth());
        }

        // IF NOT EXISTS AUTH ENTITY, SAVE AUTH ENTITY AND TOKEN
        Auth auth = this.authRepository.save(Auth.builder()
                        .user(user)
                        .tokenType("Bearer")
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build());
        return new AuthResponseDto(auth);
    }

    /** 회원가입 */
    @Transactional
    public void signup(UserRequestDto requestDto) {
        // SAVE USER ENTITY
        requestDto.setRole(Role.ROLE_USER);
        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        this.userRepository.save(requestDto.toEntity());
    }

    /** Token 갱신 */
    @Transactional
    public AuthResponseDto refreshToken(String refreshToken) {
        Auth auth = this.authRepository.findByRefreshToken(refreshToken).orElseThrow(
                () -> new IllegalArgumentException("해당 REFRESH_TOKEN 을 찾을 수 없습니다. REFRESH_TOKEN = " + refreshToken));

        auth.updateAccessToken(this.jwtTokenProvider.generateAccessToken(
                new UsernamePasswordAuthenticationToken(
                        new CustomUserDetails(auth.getUser()), auth.getUser().getPassword())));

        return new AuthResponseDto(auth);
    }
}
