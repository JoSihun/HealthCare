package com.shyd.healthcare.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Post extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer hits;

    @Column(length = 500)
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private String author;
    private Boolean secretYn;


    @Builder
    public Post(String title, String content, String author,
                Integer hits, Boolean secretYn) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.hits = hits;
        this.secretYn = secretYn;
    }


    public void increaseHits() {
        this.hits++;
    }

    public void update(String title, String content, Boolean secretYn) {
        // 추후 매개변수 Category category 추가
        this.title = title;
        this.content = content;
        this.secretYn = secretYn;
        // 추후 this.category = category 추가
    }

}
