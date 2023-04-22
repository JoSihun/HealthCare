package com.shyd.healthcare.domain.introduce;

import com.shyd.healthcare.domain.BaseTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Staff extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleName;

    @Builder
    public Staff(String roleName) {
        this.roleName = roleName;
    }
}
