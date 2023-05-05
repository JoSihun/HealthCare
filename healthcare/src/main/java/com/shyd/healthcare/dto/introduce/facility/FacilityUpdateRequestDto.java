package com.shyd.healthcare.dto.introduce.facility;

import com.shyd.healthcare.domain.introduce.Facility;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FacilityUpdateRequestDto {
    private String name;
    private String info;

    @Builder
    public FacilityUpdateRequestDto(String name, String info) {
        this.name = name;
        this.info = info;
    }

    public Facility toEntity() {
        return Facility.builder()
                .name(name)
                .info(info)
                .build();
    }
}
