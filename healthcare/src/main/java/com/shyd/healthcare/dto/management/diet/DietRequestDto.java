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
    private String foodName;
    private String foodWeight;
    private String imageAddress;
    private DietMainCategoryRequestDto mainCategoryRequestDto;
    private DietSubCategoryRequestDto subCategoryRequestDto;

    public Diet toEntity() {
        return Diet.builder()
                .foodName(this.foodName)
                .foodWeight(this.foodWeight)
                .imageAddress(this.imageAddress)
                .mainCategory(this.mainCategoryRequestDto.toEntity())
                .subCategory(this.subCategoryRequestDto.toEntity())
                .build();
    }
}
