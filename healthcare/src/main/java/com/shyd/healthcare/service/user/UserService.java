package com.shyd.healthcare.service.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.utils.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void signup(UserRequestDto requestDto) {
        requestDto.setRole(Role.ROLE_USER);
        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        this.userRepository.save(requestDto.toEntity());
    }

    @Transactional
    public String signin(UserRequestDto requestDto) {
        User entity = this.userRepository.findByUsername(requestDto.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. username = " + requestDto.getUsername()));
        if (!passwordEncoder.matches(requestDto.getPassword(), entity.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다. username = " + requestDto.getUsername());
        }
        String token = this.jwtTokenProvider.generateTokenByUsername(new UsernamePasswordAuthenticationToken(entity, null));
        return token;
    }
}
