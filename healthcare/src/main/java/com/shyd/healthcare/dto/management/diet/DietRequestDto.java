package com.shyd.healthcare.dto.management.diet;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietRequestDto {
    private User user;

    public Diet toEntity() {
        return Diet.builder()
                .user(this.user)
                .build();
    }
}
