package com.shyd.healthcare.dto.facility;

import com.shyd.healthcare.domain.Facility;
import lombok.Builder;
public class FacilityUpdateRequestDto {
    private String sectorName;
    private String sectorInfo;
    private String sectorImg;

    @Builder
    public FacilityUpdateRequestDto(String sectorName, String sectorInfo, String sectorImg) {
        this.sectorName = sectorName;
        this.sectorInfo = sectorInfo;
        this.sectorImg = sectorImg;
    }

    public Facility toEntity() {
        return Facility.builder()
                .sectorName(sectorName)
                .sectorInfo(sectorInfo)
                .sectorImg(sectorImg)
                .build();
    }
}
