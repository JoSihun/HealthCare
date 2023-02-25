package com.shyd.healthcare.domain;

import com.shyd.healthcare.dto.FacUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Facilities extends BaseTime {
    /* 잘모르는부분; */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sector_name;

    @Column(columnDefinition = "LONGTEXT")
    private String sector_info;

    private String sector_img;

    @Builder
    public Facilities(String sector_name, String sector_info, String sector_img) {
        this.sector_name = sector_name;
        this.sector_info = sector_info;
        this.sector_img = sector_img;
    }
}
