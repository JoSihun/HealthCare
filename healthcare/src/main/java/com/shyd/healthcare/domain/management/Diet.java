package com.shyd.healthcare.domain.management;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diet extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
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

    public void update(DietRequestDto requestDto) {
        this.foodFat = requestDto.getFoodFat();                                     // 지방
        this.foodName = requestDto.getFoodName();                                   // 음식명
        this.buildYear = requestDto.getBuildYear();                                 // 구축년도
        this.foodWeight = requestDto.getFoodWeight();                               // 중량
        this.foodSugars = requestDto.getFoodSugars();                               // 당류
        this.foodSodium = requestDto.getFoodSodium();                               // 나트륨
        this.foodProtein = requestDto.getFoodProtein();                             // 단백질
        this.foodCalorie = requestDto.getFoodCalorie();                             // 열량
        this.foodCholesterol = requestDto.getFoodCholesterol();                     // 콜레스테롤
        this.foodCarbohydrates = requestDto.getFoodCarbohydrates();                 // 탄수화물
        this.foodTransFattyAcids = requestDto.getFoodTransFattyAcids();             // 트랜스지방산
        this.foodSaturatedFattyAcids = requestDto.getFoodSaturatedFattyAcids();     // 포화지방산
    }
}
