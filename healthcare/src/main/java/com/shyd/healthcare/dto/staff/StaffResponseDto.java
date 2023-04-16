package com.shyd.healthcare.dto.staff;
import com.shyd.healthcare.domain.Staff;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class StaffResponseDto {
    private Long id;
    private String roleName;
    private String createdDate;
    private String updatedDate;

    public StaffResponseDto(Staff entity) {
        this.id = entity.getId();
        this.roleName = entity.getRoleName();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
