package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.repository.management.FoodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class FoodServiceTest {
    @Autowired
    private FoodService foodService;

    @Test
    @DisplayName("Top 9 식단 추천 기능")
    void recommendByBmiTest() {
        List<FoodResponseDto> foodResponseDtoList = this.foodService.recommendByBmi(488L, 9);
        for (FoodResponseDto foodResponseDto : foodResponseDtoList) {
            System.out.print("음식명: " + foodResponseDto.getName());
            System.out.print(" | 중량: " + foodResponseDto.getWeight());
            System.out.print(" | 열량: " + foodResponseDto.getCalories());
            System.out.print(" | 탄수화물: " + foodResponseDto.getCarbohydrates());
            System.out.print(" | 단백질: " + foodResponseDto.getProteins());
            System.out.print(" | 지방: " + foodResponseDto.getFats());
            System.out.print(" | 당류: " + foodResponseDto.getSugars());
            System.out.print(" | 나트륨: " + foodResponseDto.getSodium());
            System.out.print(" | 콜레스테롤: " + foodResponseDto.getCholesterol());
            System.out.print(" | 포화지방산: " + foodResponseDto.getSaturatedFattyAcids());
            System.out.println(" | 트랜스지방산: " + foodResponseDto.getTransFattyAcids());
        }
    }
}