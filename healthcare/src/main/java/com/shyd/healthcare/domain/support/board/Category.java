package com.shyd.healthcare.domain.support.board;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Category {
    FAQ_BOARD("faq-board"),
    QNA_BOARD("qna-board"),
    FREE_BOARD("free-board");

    private String category;

    Category(String category) {
        this.category = category;
    }

    @JsonCreator
    public static Category valueOfCategory(String category) {
        return Arrays.stream(values())
                .filter(value -> value.category.equals(category))
                .findAny()
                .orElse(null);
    }
}
