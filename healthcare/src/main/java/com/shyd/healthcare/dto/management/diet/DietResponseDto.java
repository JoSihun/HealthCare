package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietResponseDto {
    private Long id;
    private String foodName;                // 음식명
    private Double foodWeight;              // 중량
    private Double foodCalorie;             // 열량
    private Double foodCarbohydrates;	    // 탄수화물
    private Double foodProtein;		        // 단백질
    private Double foodFat;		            // 지방
    private Double foodSugars;		        // 당류
    private Double foodSodium;		        // 나트륨
    private Double foodCholesterol;		    // 콜레스테롤
    private Double foodSaturatedFattyAcids;	// 포화지방산
    private Double foodTransFattyAcids;     // 트랜스지방산
    private Integer buildYear;              // 구축년도

    @Builder
    public DietResponseDto(Diet entity) {
        this.foodFat = entity.getFoodFat();                                     // 지방
        this.foodName = entity.getFoodName();                                   // 음식명
        this.buildYear = entity.getBuildYear();                                 // 구축년도
        this.foodWeight = entity.getFoodWeight();                               // 중량
        this.foodSugars = entity.getFoodSugars();                               // 당류
        this.foodSodium = entity.getFoodSodium();                               // 나트륨
        this.foodProtein = entity.getFoodProtein();                             // 단백질
        this.foodCalorie = entity.getFoodCalorie();                             // 열량
        this.foodCholesterol = entity.getFoodCholesterol();                     // 콜레스테롤
        this.foodCarbohydrates = entity.getFoodCarbohydrates();                 // 탄수화물
        this.foodTransFattyAcids = entity.getFoodTransFattyAcids();             // 트랜스지방산
        this.foodSaturatedFattyAcids = entity.getFoodSaturatedFattyAcids();     // 포화지방산
    }
}
