package com.shyd.healthcare.controller.management;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import com.shyd.healthcare.service.management.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class DietRestController {
    private final DietService dietService;
    private final JwtTokenProvider jwtTokenProvider;

    /** 식단 생성 API */
    @PostMapping("/api/v1/diet")
    public Long createDiet(@RequestHeader("Authorization") String accessToken,
                           @RequestBody DietRequestDto requestDto) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken);
        return this.dietService.create(id, requestDto);
    }

    /** 식단 삭제 API */
    @DeleteMapping("/api/v1/diet")
    public void createDiet(@RequestParam Long id) {
        this.dietService.delete(id);
    }
}
