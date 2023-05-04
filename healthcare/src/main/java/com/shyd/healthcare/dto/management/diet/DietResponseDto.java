package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.DietFood;
import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietResponseDto {
    private Long id;
    private String title;
    private Double totalCalories;
    private Double basalMetabolicRate;
    private Double recommendedCaloriesIntake;

    private String createdDate;
    private String updatedDate;
    private List<FoodResponseDto> foods;

    @Builder
    public DietResponseDto(Diet entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.totalCalories = entity.getTotalCalories();
        this.basalMetabolicRate = entity.getBasalMetabolicRate();
        this.recommendedCaloriesIntake = entity.getRecommendedCaloriesIntake();

        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.foods = entity.getDietFoods().stream().map(DietFood::getFood).map(FoodResponseDto::new).collect(Collectors.toList());
    }
}
