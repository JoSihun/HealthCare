package com.shyd.healthcare.domain.support.board;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class BoardTypeTest {

    @Test
    @DisplayName("BoardType Enum Class valueOf() 테스트")
    void valueOfTest() {
        assertThat(BoardType.valueOf("FAQ_BOARD")).isEqualTo(BoardType.FAQ_BOARD);
        assertThat(BoardType.valueOf("QNA_BOARD")).isEqualTo(BoardType.QNA_BOARD);
        assertThat(BoardType.valueOf("FREE_BOARD")).isEqualTo(BoardType.FREE_BOARD);
    }

    @Test
    @DisplayName("BoardType Enum Class getValue() 테스트")
    void valueOfCategoryTest() {
        assertThat(BoardType.FAQ_BOARD.getValue()).isEqualTo("faq-board");
        assertThat(BoardType.QNA_BOARD.getValue()).isEqualTo("qna-board");
        assertThat(BoardType.FREE_BOARD.getValue()).isEqualTo("free-board");
    }
}