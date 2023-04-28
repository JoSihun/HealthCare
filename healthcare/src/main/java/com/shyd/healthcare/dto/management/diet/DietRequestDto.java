package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietRequestDto {
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

    public Diet toEntity() {
        return Diet.builder()
                .foodFat(this.foodFat)                                  // 지방
                .foodName(this.foodName)                                // 음식명
                .buildYear(this.buildYear)                              // 구축년도
                .foodWeight(this.foodWeight)                            // 중량
                .foodSugars(this.foodSugars)                            // 당류
                .foodSodium(this.foodSodium)                            // 나트륨
                .foodProtein(this.foodProtein)                          // 단백질
                .foodCalorie(this.foodCalorie)                          // 열량
                .foodCholesterol(this.foodCholesterol)                  // 콜레스테롤
                .foodCarbohydrates(this.foodCarbohydrates)              // 탄수화물
                .foodTransFattyAcids(this.foodTransFattyAcids)          // 트랜스지방산
                .foodSaturatedFattyAcids(this.foodSaturatedFattyAcids)  // 포화지방산
                .build();
    }
}
