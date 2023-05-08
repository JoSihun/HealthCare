package com.shyd.healthcare.domain.support.board;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BoardType {
    FAQ_BOARD("faq-board"),
    QNA_BOARD("qna-board"),
    FREE_BOARD("free-board");

    private final String value;
}
