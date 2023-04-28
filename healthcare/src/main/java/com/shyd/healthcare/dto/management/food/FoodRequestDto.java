package com.shyd.healthcare.dto.management.food;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.Food;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodRequestDto {
    private String name;                // 음식명
    private Double weight;              // 중량
    private Double calories;            // 열량
    private Double carbohydrates;	    // 탄수화물
    private Double proteins;		    // 단백질
    private Double fats;		        // 지방
    private Double sugars;		        // 당류
    private Double sodium;		        // 나트륨
    private Double cholesterol;		    // 콜레스테롤
    private Double saturatedFattyAcids;	// 포화지방산
    private Double transFattyAcids;     // 트랜스지방산
    private Integer buildYear;          // 구축년도
    private Diet diet;

    public Food toEntity() {
        return Food.builder()
                .diet(this.diet)
                .fats(this.fats)                                // 지방
                .name(this.name)                                // 음식명
                .buildYear(this.buildYear)                      // 구축년도
                .weight(this.weight)                            // 중량
                .sugars(this.sugars)                            // 당류
                .sodium(this.sodium)                            // 나트륨
                .proteins(this.proteins)                        // 단백질
                .calories(this.calories)                        // 열량
                .cholesterol(this.cholesterol)                  // 콜레스테롤
                .carbohydrates(this.carbohydrates)              // 탄수화물
                .transFattyAcids(this.transFattyAcids)          // 트랜스지방산
                .saturatedFattyAcids(this.saturatedFattyAcids)  // 포화지방산
                .build();
    }
}
