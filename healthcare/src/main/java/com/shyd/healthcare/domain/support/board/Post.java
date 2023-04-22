package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDto;
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

    @Column(length = 500)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer hits;
    private String category;

    private Boolean secretYn;
    private Boolean answerYn;

    @ManyToOne(fetch = FetchType.LAZY)
    private User author;
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> commentList;
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Attachment> attachmentList;

    @Builder
    public Post(String title, String content, User author, String category,
                Integer hits, Boolean secretYn, Boolean answerYn) {
        this.hits = hits;
        this.title = title;
        this.author = author;
        this.content = content;
        this.category = category;
        this.secretYn = secretYn;
        this.answerYn = answerYn;
    }

    public Long update(PostUpdateRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        this.answerYn = requestDto.getAnswerYn();
        return this.id;
    }
}
