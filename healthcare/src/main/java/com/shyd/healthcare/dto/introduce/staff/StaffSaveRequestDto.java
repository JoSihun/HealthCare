package com.shyd.healthcare.dto.introduce.staff;

import com.shyd.healthcare.domain.introduce.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffSaveRequestDto {
    private String roleName;

    @Builder
    public StaffSaveRequestDto(String roleName) {
        this.roleName = roleName;
    }

    public Staff toEntity() {
        return Staff.builder()
                .roleName(roleName)
                .build();
    }
}
