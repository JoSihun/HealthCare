package com.shyd.healthcare.controller.management;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.service.management.BMIService;
import com.shyd.healthcare.service.management.DietService;
import com.shyd.healthcare.service.management.FoodService;
import com.shyd.healthcare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DietController {
    private final BMIService bmiService;
    private final DietService dietService;
    private final FoodService foodService;
    private final JwtTokenProvider jwtTokenProvider;

    /** 식단 조회 API */
    @GetMapping("/api/v1/diet")
    public List<FoodResponseDto> fetchDiet(@RequestParam Long id) {
        return this.dietService.findById(id);
    }

    /** 식단 목록조회 API */
    @GetMapping("/api/v1/diet/list")
    public List<DietResponseDto> fetchAllDiets(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken);
        return this.dietService.findByUserId(id);
    }

    /** 추천식단 조회 API */
    @GetMapping("/api/v1/diet/recommend")
    public List<FoodResponseDto> recommendDiets(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken);
        BMIResponseDto bmiResponseDto = this.bmiService.findById(id);
        return this.foodService.recommend(bmiResponseDto.getBasalMetabolicRate(), 9);
    }
}
