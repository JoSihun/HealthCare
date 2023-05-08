package com.shyd.healthcare.controller.user;

import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.dto.user.UserResponseDto;
import com.shyd.healthcare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserRestController {
    private final UserService userService;

    /** Username 중복체크 API */
    @PostMapping("/api/v1/user/check/username")
    public ResponseEntity<?> checkUsername(@RequestBody UserRequestDto requestDto) {
        if (this.userService.existsUsername(requestDto.getUsername())) {
            return ResponseEntity.status(HttpStatus.OK).body(false);
        }
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    /** Password 변경 API */
    @PostMapping("/api/v1/user/update/password")
    public ResponseEntity<?> updatePassword(@RequestHeader("Authorization") String accessToken,
                                            @RequestBody UserRequestDto requestDto) {
        this.userService.updatePassword(accessToken, requestDto.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원정보 조회 API */
    @GetMapping("/api/v1/user")
    public UserResponseDto findUser(@RequestHeader("Authorization") String accessToken) {
        return this.userService.findByAccessToken(accessToken);
    }

    /** 회원정보 목록조회 API - List */
    @GetMapping("/api/v1/user/all-list")
    public List<UserResponseDto> findAllUserList(@RequestParam(value = "sort", required = false, defaultValue = "asc") String sort) {
        return this.userService.findAllList(sort);
    }

    /** 회원정보 목록조회 API - Page */
    @GetMapping("/api/v1/user/all-page")
    public Page<UserResponseDto> findAllUserPage(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                                 @RequestParam(value = "size", required = false, defaultValue = "20") Integer size,
                                                 @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort) {
        return this.userService.findAllPage(page, size, sort);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 회원정보 검색조회 API - List */
    @GetMapping("/api/v1/user/search-list")
    public List<UserResponseDto> searchAllUserList(@RequestParam(value = "name") String name,
                                                   @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort) {
        return this.userService.searchAllList(name, sort);
    }

    /** 회원정보 검색조회 API - Page */
    @GetMapping("/api/v1/user/search-page")
    public Page<UserResponseDto> searchAllUserPage(@RequestParam(value = "name") String name,
                                                   @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                                   @RequestParam(value = "size", required = false, defaultValue = "20") Integer size,
                                                   @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort) {
        return this.userService.searchAllPage(name, page, size, sort);
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
        this.userService.update(accessToken, requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /** 회원탈퇴 API */
    @DeleteMapping("/api/v1/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        this.userService.delete(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
