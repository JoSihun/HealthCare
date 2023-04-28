package com.shyd.healthcare.domain.introduce;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.introduce.staff.StaffUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Staff extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String staffRole;

    /** relation with USER */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Builder
    public Staff(User user, String staffRole) {
        this.user = user;
        this.staffRole = staffRole;
    }

    public Long update(StaffUpdateRequestDto requestDto) {
        this.staffRole = requestDto.getStaffRole();
        return this.id;
    }
}
