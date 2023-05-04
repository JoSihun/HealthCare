package com.shyd.healthcare.domain.management;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.management.food.FoodRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 100, nullable = false)
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

    public Long update(FoodRequestDto requestDto) {
        this.fats = requestDto.getFats();                               // 지방
        this.name = requestDto.getName();                               // 음식명
        this.weight = requestDto.getWeight();                           // 중량
        this.sugars = requestDto.getSugars();                           // 당류
        this.sodium = requestDto.getSodium();                           // 나트륨
        this.proteins = requestDto.getProteins();                       // 단백질
        this.calories = requestDto.getCalories();                       // 열량
        this.cholesterol = requestDto.getCholesterol();                 // 콜레스테롤
        this.carbohydrates = requestDto.getCarbohydrates();             // 탄수화물
        this.transFattyAcids = requestDto.getTransFattyAcids();         // 트랜스지방산
        this.saturatedFattyAcids = requestDto.getTransFattyAcids();     // 포화지방산
        this.buildYear = requestDto.getBuildYear();                     // 구축년도
        return this.id;
    }
}
