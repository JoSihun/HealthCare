package com.shyd.healthcare.dto.staff;

import com.shyd.healthcare.domain.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffUpdateRequestDto {
    private String roleName;

    @Builder
    public StaffUpdateRequestDto(String roleName) {
        this.roleName = roleName;
    }

    public Staff toEntity() {
        return Staff.builder()
                .roleName(roleName)
                .build();
    }
}
