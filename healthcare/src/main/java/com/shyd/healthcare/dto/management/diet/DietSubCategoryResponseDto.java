package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.DietSubCategory;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DietSubCategoryResponseDto {
    private Long id;
    private String categoryName;
    private String mainCategoryName;
    private List<DietResponseDto> dietResponseDtos;

    @Builder
    public DietSubCategoryResponseDto(DietSubCategory entity) {
        this.id = entity.getId();
        this.categoryName = entity.getCategoryName();
        this.mainCategoryName = entity.getMainCategory().getCategoryName();
        this.dietResponseDtos = entity.getDiets().stream().map(DietResponseDto::new).collect(Collectors.toList());
    }

}
