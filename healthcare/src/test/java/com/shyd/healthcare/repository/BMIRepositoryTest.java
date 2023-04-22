package com.shyd.healthcare.repository;

import java.io.*;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.repository.management.BMIRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BMIRepositoryTest {
    @Autowired
    private BMIRepository bmiRepository;

    @Test
    @DisplayName("BMI 데이터 전처리 삽입")
    void saveHugeDataTest() {
        // 파일 경로
        File basePath = new File(System.getProperty("user.dir"));
        String fileName = "한국건강증진개발원_보건소 모바일 헬스케어_체성분_20220721.csv";
        String filePath = basePath.getParent() + "/data/" + fileName;

        // 파일 읽기
        String line;
        String csvDelimiter = ",";
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            while ((line = br.readLine()) != null) {
                String[] row = line.split(csvDelimiter);
                // process the row data
                try {
                    Double weight = Double.parseDouble(row[2]);
                    Double height = 175.0;
                    Double bodyMassIndex = Double.parseDouble(row[3]);
                    Double fatRate = Double.parseDouble(row[4]);
                    Double fatMass = Double.parseDouble(row[5]);
                    Double bodyWaterFraction = Double.parseDouble(row[6]);
                    Double musculoskeletalRate = Double.parseDouble(row[7]);
                    Double musculoskeletalMass = Double.parseDouble(row[8]);
                    Integer basalMetabolicRate = Integer.parseInt(row[10]);

                    this.bmiRepository.save(BMI.builder()
                            .weight(weight)
                            .height(height)
                            .fatMass(fatMass)
                            .fatRate(fatRate)
                            .bodyMassIndex(bodyMassIndex)
                            .bodyWaterFraction(bodyWaterFraction)
                            .basalMetabolicRate(basalMetabolicRate)
                            .musculoskeletalMass(musculoskeletalMass)
                            .musculoskeletalRate(musculoskeletalRate)
                            .build());
                } catch (Exception e) {
                    continue;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}