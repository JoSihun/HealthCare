package com.shyd.healthcare.dto.management.bmi;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BMISaveRequestDto {
    private User user;
    private Double weight;
    private Double height;
    private Double fatMass;
    private Double fatRate;
    private Double bodyMassIndex;
    private Double bodyWaterFraction;
    private Integer basalMetabolicRate;
    private Double musculoskeletalMass;
    private Double musculoskeletalRate;

    @Builder
    public BMISaveRequestDto(Double weight, Double height, Double fatMass, Double fatRate,
                             Double musculoskeletalMass, Double musculoskeletalRate, User user,
                             Double bodyMassIndex, Double bodyWaterFraction, Integer basalMetabolicRate) {
        this.user = user;
        this.weight = weight;
        this.height = height;
        this.fatMass = fatMass;
        this.fatRate = fatRate;
        this.bodyMassIndex = bodyMassIndex;
        this.bodyWaterFraction = bodyWaterFraction;
        this.basalMetabolicRate = basalMetabolicRate;
        this.musculoskeletalMass = musculoskeletalMass;
        this.musculoskeletalRate = musculoskeletalRate;
    }

    public BMI toEntity() {
        return BMI.builder()
                .user(this.user)
                .weight(this.weight)
                .height(this.height)
                .fatMass(this.fatMass)
                .fatRate(this.fatRate)
                .bodyMassIndex(this.bodyMassIndex)
                .bodyWaterFraction(this.bodyWaterFraction)
                .basalMetabolicRate(this.basalMetabolicRate)
                .musculoskeletalMass(this.musculoskeletalMass)
                .musculoskeletalRate(this.musculoskeletalRate)
                .build();
    }
}
