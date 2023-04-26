package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.DietMainCategory;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietMainCategoryRequestDto {
    private String categoryName;

    public DietMainCategory toEntity() {
        return DietMainCategory.builder()
                .categoryName(this.categoryName)
                .build();
    }
}
