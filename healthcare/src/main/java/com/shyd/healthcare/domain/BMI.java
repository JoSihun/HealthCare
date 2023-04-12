package com.shyd.healthcare.domain;

import com.shyd.healthcare.dto.bmi.BMIUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Entity
public class BMI extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double weight;      // 체중
    private Double height;      // 신장

    private Double fatMass;     // 체지방량
    private Double fatRate;     // 체지방율

    private Double bodyMassIndex;           //BMI
    private Double bodyWaterFraction;       //체수분율
    private Integer basalMetabolicRate;     // 기초대사량

    private Double musculoskeletalMass;     // 근골격량
    private Double musculoskeletalRate;     // 근골격율

    // ManyToOne User 추가 필요

    @Builder
    public BMI(Double weight, Double height, Double fatMass, Double fatRate,
               Double musculoskeletalMass, Double musculoskeletalRate,
               Double bodyMassIndex, Double bodyWaterFraction, Integer basalMetabolicRate) {
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

    public Long update(BMIUpdateRequestDto requestDto) {
        this.weight = requestDto.getWeight();
        this.height = requestDto.getHeight();
        this.fatMass = requestDto.getFatMass();
        this.fatRate = requestDto.getFatRate();
        this.bodyMassIndex = requestDto.getBodyMassIndex();
        this.bodyWaterFraction = requestDto.getBodyWaterFraction();
        this.basalMetabolicRate = requestDto.getBasalMetabolicRate();
        this.musculoskeletalMass = requestDto.getMusculoskeletalMass();
        this.musculoskeletalRate = requestDto.getMusculoskeletalRate();
        return this.id;
    }

}
