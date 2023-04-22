package com.shyd.healthcare.domain;

import com.shyd.healthcare.dto.facility.FacilityUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Facility extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sectorName;
    @Column(columnDefinition = "LONGTEXT")
    private String sectorInfo;
    private String sectorImg;

    @Builder
    public Facility(String sectorName, String sectorInfo, String sectorImg) {
        this.sectorName = sectorName;
        this.sectorInfo = sectorInfo;
        this.sectorImg = sectorImg;
    }

    public Long update(FacilityUpdateRequestDto requestDto) {
        this.sectorName = requestDto.getSectorName();
        this.sectorInfo = requestDto.getSectorInfo();
        this.sectorImg = requestDto.getSectorImg();
        return this.id;
    }
}