package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.DietFood;
import com.shyd.healthcare.domain.user.User;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietRequestDto {
    private String title;
    private Double totalCalories;
    private Double basalMetabolicRate;
    private Double recommendedCaloriesIntake;
    private List<Long> foodIds;
}
