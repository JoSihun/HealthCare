package com.shyd.healthcare.dto.introduce.facility;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.dto.introduce.image.ImageResponseDto;
import lombok.Getter;

@Getter
public class FacilityResponseDto {
    private Long id;
    private String name;
    private String info;
    private ImageResponseDto image;

    public FacilityResponseDto(Facility entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.info = entity.getInfo();
        this.image = new ImageResponseDto(entity.getImage());
    }
}