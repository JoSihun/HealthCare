package com.shyd.healthcare.dto.introduce.staff;

import com.shyd.healthcare.domain.introduce.Staff;
import com.shyd.healthcare.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StaffSaveRequestDto {
    private User user;
    private String staffRole;


    @Builder
    public StaffSaveRequestDto(User user, String staffRole) {
        this.user = user;
        this.staffRole = staffRole;
    }

    public Staff toEntity() {
        return Staff.builder()
                .user(this.user)
                .staffRole(this.staffRole)
                .build();
    }
}
