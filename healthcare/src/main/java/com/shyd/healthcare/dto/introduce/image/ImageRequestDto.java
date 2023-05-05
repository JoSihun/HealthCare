package com.shyd.healthcare.dto.introduce.image;

import com.shyd.healthcare.domain.introduce.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Lob;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequestDto {
    private String name;
    private String type;
    private byte[] data;

    public Image toEntity() {
        return Image.builder()
                .name(this.name)
                .type(this.type)
                .data(this.data)
                .build();
    }
}
