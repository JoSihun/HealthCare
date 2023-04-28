package com.shyd.healthcare.service.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.dto.management.bmi.BMIResponseDto;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import com.shyd.healthcare.repository.management.FoodRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class FoodServiceTest {
    @Autowired
    private BMIService bmiService;
    @Autowired
    private FoodService foodService;

    @Test
    @DisplayName("Top 5 식단 추천 기능")
    void recommend() {
        BMIResponseDto bmiResponseDto = this.bmiService.findById(488L);
        List<FoodResponseDto> responseDtos = this.foodService.recommend(bmiResponseDto.getBasalMetabolicRate(), 9);
        for (FoodResponseDto responseDto : responseDtos) {
            System.out.print("음식명: " + responseDto.getName());
            System.out.print(" | 중량: " + responseDto.getWeight());
            System.out.print(" | 열량: " + responseDto.getCalories());
            System.out.print(" | 탄수화물: " + responseDto.getCarbohydrates());
            System.out.print(" | 단백질: " + responseDto.getProteins());
            System.out.print(" | 지방: " + responseDto.getFats());
            System.out.print(" | 당류: " + responseDto.getSugars());
            System.out.print(" | 나트륨: " + responseDto.getSodium());
            System.out.print(" | 콜레스테롤: " + responseDto.getCholesterol());
            System.out.print(" | 포화지방산: " + responseDto.getSaturatedFattyAcids());
            System.out.println(" | 트랜스지방산: " + responseDto.getTransFattyAcids());
        }
    }
}