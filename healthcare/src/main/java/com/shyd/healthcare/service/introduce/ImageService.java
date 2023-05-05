package com.shyd.healthcare.service.introduce;

import com.shyd.healthcare.domain.introduce.Facility;
import com.shyd.healthcare.domain.introduce.Image;
import com.shyd.healthcare.dto.introduce.image.ImageRequestDto;
import com.shyd.healthcare.dto.introduce.image.ImageResponseDto;
import com.shyd.healthcare.repository.introduce.FacilityRepository;
import com.shyd.healthcare.repository.introduce.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;
    private final FacilityRepository facilityRepository;

    /** 이미지 조회 */
    public ImageResponseDto findById(Long id) {
        Image image = this.imageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 이미지를 찾을 수 없습니다. image_id = " + id));
        return new ImageResponseDto(image);
    }

    /** 이미지 생성 */
    public Long create(MultipartFile file) throws IOException {
        ImageRequestDto requestDto = new ImageRequestDto(file.getOriginalFilename(),
                file.getContentType(), file.getBytes());
        return this.imageRepository.save(requestDto.toEntity()).getId();
    }

    /** 이미지 수정 */
    public Long update(Long id, MultipartFile file) throws IOException {
        Image image = this.imageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 이미지를 찾을 수 없습니다. image_id = " + id));
        ImageRequestDto requestDto = new ImageRequestDto(file.getOriginalFilename(),
                file.getContentType(), file.getBytes());
        return image.update(requestDto);
    }

    /** 이미지 삭제 */
    public void delete(Long id) {
        Image image = this.imageRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 이미지를 찾을 수 없습니다. image_id = " + id));
        this.imageRepository.delete(image);
    }

//    public Image findByFacilityId(Long facilityId) {
//        Facility facility = this.facilityRepository.findById(facilityId).orElseThrow(
//                () -> new IllegalArgumentException("해당 Facility가 존재하지 않습니다. facility_id = " + facilityId));
//        Image image = this.imageRepository.findByFacility(facility);
//        return image;
////        return new ImageResponseDto(image);
//    }
//
//    public void saveImage(Long facilityId, MultipartFile file) throws IOException {
//        Facility facility = this.facilityRepository.findById(facilityId).orElseThrow(
//                () -> new IllegalArgumentException("해당 Facility가 존재하지 않습니다. facility_id = " + facilityId));
//        Image image = Image.builder()
//                .name(file.getOriginalFilename())
//                .type(file.getContentType())
//                .data(file.getBytes())
//                .facility(facility)
//                .build();
//        this.imageRepository.save(image);
//    }
}
