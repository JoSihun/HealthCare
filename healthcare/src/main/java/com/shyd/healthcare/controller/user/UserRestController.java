package com.shyd.healthcare.controller.user;

import com.shyd.healthcare.config.CustomUserDetails;
import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.dto.user.UserResponseDto;
import com.shyd.healthcare.service.user.UserService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserRestController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    /** Username 중복체크 API */
    @PostMapping("/api/v1/user/check/username")
    public ResponseEntity<?> checkUsername(@RequestBody UserRequestDto requestDto) {
        if (userService.existsUsername(requestDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원정보 조회 API */
    @GetMapping("/api/v1/user")
    public UserResponseDto findUser(@RequestHeader("Authorization") String accessToken) {
        if (this.jwtTokenProvider.validateToken(accessToken.substring(7))) {
            Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
            return this.userService.findById(id);
        }
        return null;
    }

    /** 회원정보 목록조회 API */
    @GetMapping("/api/v1/user/all")
    public List<UserResponseDto> findAllUser() {
        return this.userService.findAll();
    }

    /** 회원정보 검색조회 API */
    @GetMapping("/api/v1/user/search")
    public List<UserResponseDto> findAllByUsername(@RequestParam(value = "username") String username) {
        return this.userService.findAllByUsername(username);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원가입 API */
    @PostMapping("/api/v1/user")
    public ResponseEntity<?> createUser(@RequestBody UserRequestDto requestDto) {
        this.userService.create(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /** 회원수정 API */
    @PutMapping("/api/v1/user")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken,
                                        @RequestBody UserRequestDto requestDto) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken);
        this.userService.update(id, requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /** 회원탈퇴 API */
    @DeleteMapping("/api/v1/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken);
        this.userService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
