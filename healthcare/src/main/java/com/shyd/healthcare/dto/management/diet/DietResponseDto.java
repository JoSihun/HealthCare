package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.dto.management.food.FoodResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietResponseDto {
    private Long id;

    @Builder
    public DietResponseDto(Diet entity) {
        this.id = entity.getId();
    }
}
