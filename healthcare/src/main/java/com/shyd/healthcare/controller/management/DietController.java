package com.shyd.healthcare.controller.management;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.service.management.DietService;
import com.shyd.healthcare.service.management.FoodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DietController {
    private final DietService dietService;
    private final FoodService foodService;
    private final JwtTokenProvider jwtTokenProvider;

    /** 식단 조회 API */
    @GetMapping("api/v1/diet/{id}")
    public DietResponseDto fetchDiet(@PathVariable Long id) {
        return this.dietService.findById(id);
    }

    /** 식단 목록조회 API - Page */
    @GetMapping("/api/v1/diet/list")
    public Page<DietResponseDto> fetchAllDietsByUser(
            @RequestHeader("Authorization") String accessToken,
            @PageableDefault(sort = "id", size = 10, direction = Sort.Direction.DESC) Pageable pageable) {
        return this.dietService.findAllByUser(accessToken, pageable);
    }

    /** 식단추천 목록조회 API */
    @GetMapping("/api/v1/diet/recommend")
    public List<FoodResponseDto> recommendFoodsByBmi(@RequestParam("bmiId") Long bmiId) {
        return this.foodService.recommendByBmi(bmiId, 9);
    }
}
