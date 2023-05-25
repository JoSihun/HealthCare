package com.shyd.healthcare.service.user;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import com.shyd.healthcare.dto.user.UserResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /** Username 중복체크 */
    @Transactional
    public Boolean existsUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }
    
    /** Password 변경 */
    @Transactional
    public void updatePassword(String accessToken, String password) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        user.updatePassword(passwordEncoder.encode(password));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원정보 조회 */
    @Transactional
    public UserResponseDto findByAccessToken(String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        return new UserResponseDto(user);
    }

    /** 회원정보 목록조회 - List */
    @Transactional
    public List<UserResponseDto> findAllList(String sortOption) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOption.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, "id");
        List<User> users = this.userRepository.findAll(sort);
        return users.stream().map(UserResponseDto::new).collect(Collectors.toList());
    }

    /** 회원정보 목록조회 - Page */
    @Transactional
    public Page<UserResponseDto> findAllPage(Integer page, Integer size, String sortOption) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOption.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<User> users = this.userRepository.findAll(pageable);
        return users.map(UserResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원정보 검색조회 - List */
    @Transactional
    public List<UserResponseDto> searchAllList(String name, String sortOption) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOption.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, "id");
        List<User> users = this.userRepository.findAllByNameContaining(name, sort);
        return users.stream().map(UserResponseDto::new).collect(Collectors.toList());
    }

    /** 회원정보 검색조회 - Page */
    @Transactional
    public Page<UserResponseDto> searchAllPage(String name, Integer page, Integer size, String sortOption) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortOption.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<User> users = this.userRepository.findAllByNameContaining(name, pageable);
        return users.map(UserResponseDto::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** User 삽입 */
    @Transactional
    public void create(UserRequestDto requestDto) {
        requestDto.setRole(Role.ROLE_USER);
        requestDto.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        this.userRepository.save(requestDto.toEntity());
    }

    /** User 수정 */
    @Transactional
    public void update(String accessToken, UserRequestDto requestDto) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        user.update(requestDto);
    }

    /** User 삭제 */
    @Transactional
    public void delete(String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        this.userRepository.delete(user);
    }
}
