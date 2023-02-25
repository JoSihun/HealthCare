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

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
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

    /* 추후 어떤 것으로 사용할 것인지 선택 필요 */
    public Long update(PostUpdateRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        return this.id;
    }

    public void update(String title, String content, Boolean secretYn) {
        // 추후 매개변수 Category category 추가
        this.title = title;
        this.content = content;
        this.secretYn = secretYn;
        // 추후 this.category = category 추가
    }

}
