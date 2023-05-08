package com.shyd.healthcare.domain.support.board;

import com.shyd.healthcare.domain.BaseTime;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.post.PostUpdateRequestDTO;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50)
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String content;

    private Integer hits = 0;
    private Boolean secretYn = false;
    private Boolean answerYn = false;
    @Enumerated(EnumType.STRING)
    private BoardType boardType;

    // RELATIONSHIPS WITH OTHER ENTITIES
    @ManyToOne(fetch = FetchType.LAZY)
    private User author;
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments;
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Attachment> attachments;

    public Long update(PostUpdateRequestDTO requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.secretYn = requestDto.getSecretYn();
        this.answerYn = requestDto.getAnswerYn();
        return this.id;
    }

    public void increaseHits() {
        this.hits++;
    }
}
