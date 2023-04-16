package com.shyd.healthcare.domain.support.board;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

class CategoryTest {

    @Test
    @DisplayName("valueOf() 테스트")
    void valueOfTest() {
        assertThat(Category.valueOf("FREE_BOARD")).isEqualTo(Category.FREE_BOARD);
    }

    @Test
    @DisplayName("valueOfCategory() 테스트")
    void valueOfCategoryTest() {
        assertThat(Category.valueOfCategory("free-board")).isEqualTo(Category.FREE_BOARD);
    }
}