package com.shyd.healthcare.dto.introduce.staff;

import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffSaveRequestDto {
    private String staffRole;
    private String staffName;
    private String staffPhone;
    private String staffImg;


    @Builder
    public StaffSaveRequestDto(String staffRole, String staffName, String staffPhone, String staffImg) {
        this.staffRole = staffRole;
        this.staffName = staffName;
        this.staffPhone = staffPhone;
        this.staffImg = staffImg;
    }

    public Staff toEntity() {
        return Staff.builder()
                .staffRole(staffRole)
                .staffName(staffName)
                .staffPhone(staffPhone)
                .staffImg(staffImg)
                .build();
    }
}
