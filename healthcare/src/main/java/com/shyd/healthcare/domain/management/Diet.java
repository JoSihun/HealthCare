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
    @Column(length = 50, nullable = false)
    private String foodName;
    @Column(length = 50)
    private String foodWeight;
    @Column(columnDefinition = "LONGTEXT")
    private String imageAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    private DietMainCategory mainCategory;
    @ManyToOne(fetch = FetchType.LAZY)
    private DietSubCategory subCategory;

    public void updateMainCategory(DietMainCategory mainCategory) {
        this.mainCategory = mainCategory;
    }
    public void updateSubCategory(DietSubCategory subCategory) {
        this.subCategory = subCategory;
    }
    public void update(DietRequestDto requestDto) {
        this.foodName = requestDto.getFoodName();
        this.imageAddress = requestDto.getImageAddress();
        this.mainCategory = requestDto.getMainCategoryRequestDto().toEntity();
        this.subCategory = requestDto.getSubCategoryRequestDto().toEntity();
    }
}
