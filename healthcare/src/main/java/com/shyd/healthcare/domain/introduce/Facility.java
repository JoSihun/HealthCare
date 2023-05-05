package com.shyd.healthcare.domain.introduce;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.dto.introduce.facility.FacilityUpdateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Facility extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(columnDefinition = "LONGTEXT")
    private String info;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Image image;

    public Long update(FacilityUpdateRequestDto requestDto) {
        this.name = requestDto.getName();
        this.info = requestDto.getInfo();
        return this.id;
    }
}