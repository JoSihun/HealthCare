package com.shyd.healthcare.domain.management;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.management.diet.DietRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diet extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "diet", cascade = CascadeType.REMOVE)
    private List<Food> foods;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
