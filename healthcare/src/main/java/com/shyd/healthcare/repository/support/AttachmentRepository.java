package com.shyd.healthcare.repository.support;

import com.shyd.healthcare.domain.support.board.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}
