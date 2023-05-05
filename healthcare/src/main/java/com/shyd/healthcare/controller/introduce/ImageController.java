package com.shyd.healthcare.controller.introduce;

import com.shyd.healthcare.domain.introduce.Image;
import com.shyd.healthcare.dto.introduce.image.ImageRequestDto;
import com.shyd.healthcare.dto.introduce.image.ImageResponseDto;
import com.shyd.healthcare.repository.introduce.ImageRepository;
import com.shyd.healthcare.service.introduce.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageRepository imageRepository;

//    @GetMapping(value = "/image/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
//    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
//        Image image = imageRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Image not found"));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        headers.setContentLength(image.getData().length);
//
//        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
//    }

//    @GetMapping(value = "/image/{facilityId}", produces = MediaType.IMAGE_JPEG_VALUE)
//    public ResponseEntity<byte[]> getImage(@PathVariable Long facilityId) {
//        Image image = this.imageService.findByFacilityId(facilityId);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.IMAGE_JPEG);
//        headers.setContentLength(image.getData().length);
//
//        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
//    }
//
//    @PostMapping("/upload")
//    public void uploadImage(@RequestParam(value = "facilityId") Long facilityId,
//                            @RequestParam("file")MultipartFile file) throws IOException {
//        this.imageService.saveImage(facilityId, file);
//    }
    /** 이미지 조회 API */
    @GetMapping("/image/{id}")
    public ImageResponseDto fetchImage(@PathVariable Long id) {
        return this.imageService.findById(id);
    }

    /** 이미지 생성 API */
    @PostMapping("/image")
    public Long createImage(@RequestParam("file") MultipartFile file) throws IOException {
        return this.imageService.create(file);
    }

    /** 이미지 수정 API */
    @PutMapping("/image/{id}")
    public Long updateImage(@PathVariable Long id,
                            @RequestParam("file") MultipartFile file) throws IOException {
        return this.imageService.update(id, file);
    }
    
    /** 이미지 삭제 API */
    @DeleteMapping("/image/{id}")
    public void deleteImage(@PathVariable Long id) {
        this.imageService.delete(id);
    }
}
