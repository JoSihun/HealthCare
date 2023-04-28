package com.shyd.healthcare.dto.introduce.staff;
import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class StaffResponseDto {
    private Long id;
    private String createdDate;
    private String updatedDate;

    public StaffResponseDto(Staff entity) {
        this.id = entity.getId();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
