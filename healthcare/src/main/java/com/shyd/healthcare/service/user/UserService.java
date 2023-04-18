package com.shyd.healthcare.service.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.repository.user.UserRepository;
import com.shyd.healthcare.utils.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.shyd.healthcare.dto.user.UserResponseDto;
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

    /** 회원가입 */
    @Transactional
    public void signup(UserRequestDto requestDto) {
        requestDto.setRole(Role.ROLE_USER);
        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        this.userRepository.save(requestDto.toEntity());
    }

    /** 로그인 */
    @Transactional
    public UserResponseDto signin(UserRequestDto requestDto) {
        User entity = this.userRepository.findByUsername(requestDto.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. username = " + requestDto.getUsername()));
        if (!passwordEncoder.matches(requestDto.getPassword(), entity.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다. username = " + requestDto.getUsername());
        }
//        String token = this.jwtTokenProvider.generateTokenByUsername(new UsernamePasswordAuthenticationToken(entity, null));
        String token = this.jwtTokenProvider.generateToken(new UsernamePasswordAuthenticationToken(entity, null));
        UserResponseDto responseDto = new UserResponseDto(entity);
        responseDto.setAccessToken(token);
        return responseDto;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Transactional
    public UserResponseDto findByEmail(String email) {
        User entity = this.userRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저의 email 을 찾을 수 없습니다. email = " + email));
        return new UserResponseDto(entity);
    }

    @Transactional
    public UserResponseDto findByUsername(String username) {
        User entity = this.userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("해당 유저의 username 을 찾을 수 없습니다. email = " + username));
        return new UserResponseDto(entity);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private Boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private Boolean checkUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    @Transactional
//    public Long create(UserRequestDto requestDto) {
//        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
//        return this.userRepository.save(requestDto.toEntity()).getId();
//    }
//
//    @Transactional
//    public Long update(final Long id, final UserRequestDto requestDto) {
//        User entity = this.userRepository.findById(id).orElseThrow(
//                () -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. user_id = " + id));
//        entity.update(requestDto);
//    }
//
//    @Transactional
//    public void delete(final Long id) {
//        User entity = this.userRepository.findById(id).orElseThrow(
//                () -> new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. user_id = " + id));
//        this.userRepository.delete(entity);
//    }
}
