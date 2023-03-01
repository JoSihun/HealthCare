package com.shyd.healthcare.domain;

import com.shyd.healthcare.dto.post.PostUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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
    private String category;
    private Boolean secretYn;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Attachment> attachmentList;

    @Builder
    public Post(String title, String content, String author,
                String category, Integer hits, Boolean secretYn) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.hits = hits;
        this.category = category;
        this.secretYn = secretYn;
    }


    public void increaseHits() {
        this.hits++;
    }

    public Long update(PostUpdateRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        return this.id;
    }

}
