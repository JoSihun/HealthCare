package com.shyd.healthcare.domain.management;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diet extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 150, columnDefinition = "TEXT")
    private String title;
    private Double totalCalories;
    private Double basalMetabolicRate;
    private Double recommendedCaloriesIntake;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    @OneToMany(mappedBy = "diet", cascade = CascadeType.REMOVE)
    private List<DietFood> dietFoods;

    public Long update(DietRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.totalCalories = requestDto.getTotalCalories();
        this.basalMetabolicRate = requestDto.getBasalMetabolicRate();
        this.recommendedCaloriesIntake = requestDto.getRecommendedCaloriesIntake();
        return this.id;
    }

    public void updateDietFoods(List<DietFood> dietFoods) {
        this.dietFoods = dietFoods;
    }
}
