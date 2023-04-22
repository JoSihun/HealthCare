package com.shyd.healthcare.dto.management.bmi;

import com.shyd.healthcare.domain.management.BMI;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class BMIResponseDto {
    private Long id;
    private Double weight;
    private Double height;
    private Double fatMass;
    private Double fatRate;
    private Double bodyMassIndex;
    private Double bodyWaterFraction;
    private Integer basalMetabolicRate;
    private Double musculoskeletalMass;
    private Double musculoskeletalRate;
    private String username;
    private String createdDate;
    private String updatedDate;

    public BMIResponseDto(BMI entity) {
        this.id = entity.getId();
        this.weight = entity.getWeight();
        this.height = entity.getHeight();
        this.fatMass = entity.getFatMass();
        this.fatRate = entity.getFatRate();
        this.bodyMassIndex = entity.getBodyMassIndex();
        this.bodyWaterFraction = entity.getBodyWaterFraction();
        this.basalMetabolicRate = entity.getBasalMetabolicRate();
        this.musculoskeletalMass = entity.getMusculoskeletalMass();
        this.musculoskeletalRate = entity.getMusculoskeletalRate();

        this.username = entity.getUser().getUsername();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
