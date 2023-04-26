package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.DietMainCategory;
import com.shyd.healthcare.domain.management.DietSubCategory;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietMainCategoryResponseDto {
    private Long id;
    private String categoryName;
    private List<DietResponseDto> dietResponseDtos;
    private List<DietSubCategoryResponseDto> subCategoryResponseDtos;

    @Builder
    public DietMainCategoryResponseDto(DietMainCategory entity) {
        this.id = entity.getId();
        this.categoryName = entity.getCategoryName();
        this.dietResponseDtos = entity.getDiets().stream().map(DietResponseDto::new).collect(Collectors.toList());
        this.subCategoryResponseDtos = entity.getSubCategories().stream().map(DietSubCategoryResponseDto::new).collect(Collectors.toList());
    }

}
