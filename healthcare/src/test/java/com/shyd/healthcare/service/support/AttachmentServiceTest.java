package com.shyd.healthcare.service.support;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.util.UriUtils;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class AttachmentServiceTest {

    @Test
    @DisplayName("파일 경로 테스트")
    void filePathTest() {
        Path basePath = Paths.get(System.getProperty("user.dir"));
        Path savePath = basePath.getParent().resolve("attachments");
        System.out.println(System.getProperty("user.dir"));
        System.out.println("BASE_PATH = " + basePath);
        System.out.println("SAVE_PATH = " + savePath);

        File basePath2 = new File(System.getProperty("user.dir"));
        String savePath2 = basePath2.getParent() + "\\attachments";
        System.out.println("BASE_PATH2 = " + basePath2);
        System.out.println("SAVE_PATH2 = " + savePath2 );

        assertThat(basePath.toString()).isEqualTo(basePath2.toString());
        assertThat(savePath.toString()).isEqualTo(savePath2.toString());
    }

    @Test
    @DisplayName("URI 확인 테스트")
    void uriTest() throws MalformedURLException {
        Path testpath = Paths.get(System.getProperty("user.dir")).resolve("TestFileName.txt");
        Resource resource = new UrlResource(testpath.toUri());
        String encodedFileName = UriUtils.encode("TestFileName.txt", StandardCharsets.UTF_8);

        System.out.println("toUri() = " + testpath.toUri());
        System.out.println("Encoded FileName = " + encodedFileName);
        System.out.println("Not Encoded FileName = " + resource.getFilename());

//        /** 단일 첨부파일 다운로드 API */
//        @Transactional
//        public ResponseEntity<Resource> download(Long attachmentId) throws MalformedURLException {
//            Attachment entity = this.attachmentRepository.findById(attachmentId).orElseThrow(
//                    () -> new IllegalArgumentException("해당 첨부파일이 존재하지 않습니다. attachment_id = " + attachmentId));
//
//            UrlResource resource = new UrlResource("file:" + entity.getFilePath());
//            String encodedFileName = UriUtils.encode(entity.getFileName(), StandardCharsets.UTF_8);
//            String contentDisposition = "attachment; filename=\"" + encodedFileName + "\"";
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
//                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                    .body(resource);
//        }
    }

}