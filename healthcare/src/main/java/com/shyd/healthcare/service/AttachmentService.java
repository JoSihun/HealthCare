package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.Attachment;
import com.shyd.healthcare.domain.Post;
import com.shyd.healthcare.dto.attachment.AttachmentResponseDto;
import com.shyd.healthcare.dto.attachment.AttachmentSaveRequestDto;
import com.shyd.healthcare.dto.attachment.AttachmentUpdateRequestDto;
import com.shyd.healthcare.repository.AttachmentRepository;
import com.shyd.healthcare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AttachmentService {
    private final PostRepository postRepository;
    private final AttachmentRepository attachmentRepository;

    /** 단일 첨부파일 불러오기 */
    @Transactional
    public AttachmentResponseDto findById(Long attachmentId) {
        Attachment entity = this.attachmentRepository.findById(attachmentId).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + attachmentId)
        );
        return new AttachmentResponseDto(entity);
    }

    /** 모든 첨부파일 불러오기 - 게시글에 연결된 */
    @Transactional
    public List<AttachmentResponseDto> findAllByPostId(Long postId) {
        Post entity = this.postRepository.findById(postId).orElseThrow(
                () -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id = " + postId)
        );
        List<Attachment> attachmentList = entity.getAttachmentList();
        return attachmentList.stream().map(AttachmentResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** 단일 첨부파일 저장 */
    @Transactional
    public Long save(final AttachmentSaveRequestDto requestDto) {
        return this.attachmentRepository.save(requestDto.toEntity()).getId();
    }

    /** 단일 첨부파일 업데이트 */
    @Transactional
    public Long update(final Long id, final AttachmentUpdateRequestDto requestDto) {
        Attachment entity = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + id)
        );
        return entity.update(requestDto);
    }

    /** 단일 첨부파일 삭제 */
    @Transactional
    public Long delete(final Long id) {
        Attachment entity = this.attachmentRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. id = " + id)
        );
        this.attachmentRepository.delete(entity);
        return id;
    }
}
