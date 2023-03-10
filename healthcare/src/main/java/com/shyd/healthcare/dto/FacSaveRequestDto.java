package com.shyd.healthcare.dto;

import com.shyd.healthcare.domain.Facilities;
import com.shyd.healthcare.domain.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FacSaveRequestDto {
    private String sector_name;
    private String sector_info;
    private String sector_img;

    @Builder
    public FacSaveRequestDto(String sector_name, String sector_info, String sector_img){
        this.sector_name = sector_name;
        this.sector_info = sector_info;
        this.sector_img = sector_img;
    }

    public Facilities toEntity() {
        return Facilities.builder()
                .sector_name(sector_name)
                .sector_info(sector_info)
                .sector_img(sector_img)
                .build();
    }

}
