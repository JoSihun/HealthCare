package com.shyd.healthcare.dto.facility;

import com.shyd.healthcare.domain.Facility;
import lombok.Getter;

@Getter
public class FacilityResponseDto {
    private Long id;
    private String sectorName;
    private String sectorInfo;
    private String sectorImg;

    public FacilityResponseDto(Facility entity) {
        this.id = entity.getId();

        this.sectorName = entity.getSectorName();
        this.sectorInfo = entity.getSectorInfo();
        this.sectorImg = entity.getSectorImg();
    }
}