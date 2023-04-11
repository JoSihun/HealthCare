package com.shyd.healthcare.controller.user;

import com.shyd.healthcare.dto.user.UserRequestDto;
import com.shyd.healthcare.service.user.UserService;
import com.shyd.healthcare.utils.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserRestController {
    private final UserService userService;

    @PostMapping("/api/v1/user/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDto requestDto) {
        this.userService.signup(requestDto);
        return ResponseEntity.ok().body("Signup");
    }

    @PostMapping("/api/v1/user/signin")
    public ResponseEntity<?> signin(@RequestBody UserRequestDto requestDto) {
        String token = this.userService.signin(requestDto);
        return ResponseEntity.ok().body(token);
    }

}
