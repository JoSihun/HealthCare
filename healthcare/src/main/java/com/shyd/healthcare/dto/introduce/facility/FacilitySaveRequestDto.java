package com.shyd.healthcare.dto.introduce.facility;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.domain.introduce.Image;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacilitySaveRequestDto {
    private String name;
    private String info;
    private Image image;

    public Facility toEntity() {
        return Facility.builder()
                .name(this.name)
                .info(this.info)
                .image(this.image)
                .build();
    }
}
