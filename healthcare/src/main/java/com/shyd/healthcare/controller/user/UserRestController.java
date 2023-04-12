package com.shyd.healthcare.controller.user;

import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserRestController {
    private final UserService userService;

    /** 회원가입 API */
    @PostMapping("/api/v1/user/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDto requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.ok().body("Signup");
    }

    /** 로그인 API */
    @PostMapping("/api/v1/user/signin")
    public ResponseEntity<?> signin(@RequestBody UserRequestDto requestDto) {
        String token = this.userService.signin(requestDto);
        return ResponseEntity.ok().body(token);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    /** Email 중복체크 API */
//    @GetMapping("/api/v1/auth/check/email/{email}")
//    public ResponseEntity<?> checkEmail(@PathVariable String email) {
//        if (userService.checkEmail(email)) {
//            return ResponseEntity.status(HttpStatus.OK).body(false);
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(true);
//    }
//
//    /** UserName 중복체크 API */
//    @GetMapping("/api/v1/auth/check/username/{username}")
//    public ResponseEntity<?> checkUsername(@PathVariable String username) {
//        if (userService.checkUsername(username)) {
//            return ResponseEntity.status(HttpStatus.OK).body(false);
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(true);
//    }
}
