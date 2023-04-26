package com.shyd.healthcare.dto.introduce.staff;
import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class StaffResponseDto {
    private Long id;
    private String staffName;
    private String staffRole;
    private String staffPhone;
    private String staffImg;
    private String createdDate;
    private String updatedDate;

    public StaffResponseDto(Staff entity) {
        this.id = entity.getId();
        this.staffName = entity.getStaffName();
        this.staffRole = entity.getStaffRole();
        this.staffPhone = entity.getStaffPhone();
        this.staffImg = entity.getStaffImg();
        this.createdDate = entity.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
        this.updatedDate = entity.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss"));
    }
}
