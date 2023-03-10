package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Facilities;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class FacResponseDto {
    private Long id;
    private String sector_name;
    private String sector_info;
    private String sector_img;

    public FacResponseDto(Facilities entity) {
        this.id = entity.getId();

        this.sector_name = entity.getSector_name();
        this.sector_info = entity.getSector_info();
        this.sector_img = entity.getSector_img();
    }
}
