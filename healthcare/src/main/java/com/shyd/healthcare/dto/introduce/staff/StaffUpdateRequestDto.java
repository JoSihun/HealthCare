package com.shyd.healthcare.dto.introduce.staff;

import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffUpdateRequestDto {
    private String staffRole;


    @Builder
    public StaffUpdateRequestDto(String staffRole) {
        this.staffRole = staffRole;
    }

    public Staff toEntity() {
        return Staff.builder()
                .staffRole(staffRole)
                .build();
    }
}
