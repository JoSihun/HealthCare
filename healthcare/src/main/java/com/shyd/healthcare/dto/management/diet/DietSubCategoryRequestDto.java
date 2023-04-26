package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.DietSubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietSubCategoryRequestDto {
    private String categoryName;

    public DietSubCategory toEntity() {
        return DietSubCategory.builder()
                .categoryName(this.categoryName)
                .build();
    }
}
