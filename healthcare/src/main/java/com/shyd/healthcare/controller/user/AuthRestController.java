package com.shyd.healthcare.controller.user;

import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.dto.user.UserResponseDto;
import com.shyd.healthcare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthRestController {
    private final UserService userService;

    /** 로그인 API */
    @PostMapping("/api/v1/auth/signin")
    public ResponseEntity<?> signin(@RequestBody UserRequestDto requestDto) {
        UserResponseDto responseDto = this.userService.signin(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    /** 회원가입 API */
    @PostMapping("/api/v1/auth/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDto requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.OK).body("SignUp Success");
    }
}
