package com.shyd.healthcare.domain.introduce;

import com.shyd.healthcare.dto.introduce.image.ImageRequestDto;
import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String type;
    @Lob
    private byte[] data;

    @OneToOne(mappedBy = "image")
    private Facility facility;

    public Long update(ImageRequestDto requestDto) {
        this.name = requestDto.getName();
        this.type = requestDto.getType();
        this.data = requestDto.getData();
        return this.id;
    }
}
