package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietResponseDto {
    private Long id;
    private String foodName;
    private String foodWeight;
    private String imageSource;
    private String mainCategory;
    private String subCategory;

    @Builder
    public DietResponseDto(Diet entity) {
        this.id = entity.getId();
        this.foodName = entity.getFoodName();
        this.foodWeight = entity.getFoodWeight();
        this.imageSource = entity.getImageAddress();
        this.mainCategory = entity.getMainCategory().getCategoryName();
        this.subCategory = entity.getSubCategory().getCategoryName();
    }
}
