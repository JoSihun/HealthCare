package com.shyd.healthcare.dto.introduce.staff;

import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffSaveRequestDto {
    private String staffRole;

    @Builder
    public StaffSaveRequestDto(String staffRole) {
        this.staffRole = staffRole;
    }

    public Staff toEntity() {
        return Staff.builder()
                .staffRole(staffRole)
                .build();
    }
}
