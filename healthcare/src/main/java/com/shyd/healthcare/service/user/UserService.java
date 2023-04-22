package com.shyd.healthcare.service.user;

import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import com.shyd.healthcare.dto.user.UserResponseDto;
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

    /** Usernamee 중복체크 */
    @Transactional
    public Boolean existsUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    /** User Password 변경 */
    @Transactional
    public void updatePassword(Long id, String password) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        user.updatePassword(passwordEncoder.encode(password));
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** User 조회 */
    @Transactional
    public UserResponseDto findById(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        return new UserResponseDto(user);
    }

    /** User 목록조회 */
    @Transactional
    public List<UserResponseDto> findAll() {
        List<User> users = this.userRepository.findAll();
        return users.stream().map(UserResponseDto::new).collect(Collectors.toList());
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
    public void update(Long id, UserRequestDto requestDto) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        user.update(requestDto);
    }

    /** User 삭제 */
    @Transactional
    public void delete(Long id) {
        User user = this.userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + id));
        this.userRepository.delete(user);
    }
}
