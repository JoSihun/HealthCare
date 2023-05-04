package com.shyd.healthcare.dto.management.food;

import com.shyd.healthcare.domain.management.Food;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponseDto {
    private Long id;
    private String name;                // 음식명
    private Double weight;              // 중량
    private Double calories;            // 열량
    private Double carbohydrates;	    // 탄수화물
    private Double proteins;		    // 단백질
    private Double fats;		        // 지방
    private Double sugars;		        // 당류
    private Double sodium;		        // 나트륨
    private Double cholesterol;		    // 콜레스테롤
    private Double saturatedFattyAcids; // 포화지방산
    private Double transFattyAcids;     // 트랜스지방산
    private Integer buildYear;          // 구축년도

    @Builder
    public FoodResponseDto(Food entity) {
        this.id = entity.getId();
        this.buildYear = entity.getBuildYear();                         // 구축년도
        this.fats = entity.getFats();                                   // 지방
        this.name = entity.getName();                                   // 음식명
        this.weight = entity.getWeight();                               // 중량
        this.sugars = entity.getSugars();                               // 당류
        this.sodium = entity.getSodium();                               // 나트륨
        this.proteins = entity.getProteins();                           // 단백질
        this.calories = entity.getCalories();                           // 열량
        this.cholesterol = entity.getCholesterol();                     // 콜레스테롤
        this.carbohydrates = entity.getCarbohydrates();                 // 탄수화물
        this.transFattyAcids = entity.getTransFattyAcids();             // 트랜스지방산
        this.saturatedFattyAcids = entity.getSaturatedFattyAcids();     // 포화지방산
    }
}
