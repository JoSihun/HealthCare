package com.shyd.healthcare.dto.introduce.image;

import com.shyd.healthcare.domain.introduce.Image;
import lombok.Getter;

@Getter
public class ImageResponseDto {
    private Long id;
    private String name;
    private String type;
    private byte[] data;

    public ImageResponseDto(Image entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.type = entity.getType();
        this.data = entity.getData();
    }
}

