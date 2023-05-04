package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.BMI;
import com.shyd.healthcare.domain.user.Role;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.repository.user.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class BMIRepositoryTest {
    @Autowired
    private BMIRepository bmiRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Path DATA_PATH = Paths.get(System.getProperty("user.dir")).getParent().resolve("data");
    private static final String FILE_NAME = "한국건강증진개발원_보건소 모바일 헬스케어_체성분_20220721.csv";
    private static final String FILE_PATH = DATA_PATH.resolve(FILE_NAME).toString();


    @Test
    @DisplayName("BMI 데이터 전처리 삽입")
    void saveHugeDataTest() {
        // INITIALIZE VARIABLES
        Map<Long, User> userBMIMap = new HashMap<>();

        // READ CSV FILE
        try (BufferedReader br = new BufferedReader(new FileReader(FILE_PATH))) {
            String line;
            br.readLine();

            // READ LINES EXCEPT FIRST ROW
            while ((line = br.readLine()) != null) {
                // CONVERT ARRAY INTO LIST
                List<String> row = new ArrayList<>(Arrays.asList(line.split(",")));

                // PRINT BEFORE PREPROCESS
                System.out.print("[BEFORE] Row Length = " + row.size() + " | ");
                System.out.println(row.toString());

                // ADD EMPTY COLUMNS WITH 0
                while (row.size() < 11) {
                    row.add("0");
                }

                // PRINT AFTER PREPROCESS
                System.out.print("[AFTER] Row Length = " + row.size() + " | ");
                System.out.println(row.toString());

                // PREPROCESS EACH COLUMNS
                Long id = Long.parseLong(row.get(1));
                Double weight = StringUtils.hasText(row.get(2)) ? Double.parseDouble(row.get(2)) : 0;
                Double height = 175.0;
                Double bodyMassIndex = StringUtils.hasText(row.get(3)) ? Double.parseDouble(row.get(3)) : 0;
                Double fatRate = StringUtils.hasText(row.get(4)) ? Double.parseDouble(row.get(4)) : 0;
                Double fatMass = StringUtils.hasText(row.get(5)) ? Double.parseDouble(row.get(5)) : 0;
                Double bodyWaterFraction = StringUtils.hasText(row.get(6)) ? Double.parseDouble(row.get(6)) : 0;
                Double musculoskeletalRate = StringUtils.hasText(row.get(7)) ? Double.parseDouble(row.get(7)) : 0;
                Double musculoskeletalMass = StringUtils.hasText(row.get(8)) ? Double.parseDouble(row.get(8)) : 0;
                Integer basalMetabolicRate = StringUtils.hasText(row.get(10)) ? Integer.parseInt(row.get(10)) : 0;

                // PREPROCESS IDX_CODE, CREATE USER BY IDX_CODE
                if (!userBMIMap.containsKey(id)) {
                    String username = "test" + id;
                    User user = this.userRepository.save(User.builder()
                            .role(Role.ROLE_USER)
                            .email(username + "@test.com")
                            .contact("010-1234-5678")
                            .username(username)
                            .password(passwordEncoder.encode("test"))
                            .build());
                    userBMIMap.put(id, user);
                }

                // PREPROCESS CREATED DATE
                String createdDate = row.get(0);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                LocalDateTime formattedDate = LocalDateTime.parse(createdDate, formatter);

                // SAVE BMI DATA
                this.bmiRepository.save(BMI.builder()
                        .user(userBMIMap.get(id))
                        .weight(weight)
                        .height(height)
                        .fatMass(fatMass)
                        .fatRate(fatRate)
                        .bodyMassIndex(bodyMassIndex)
                        .bodyWaterFraction(bodyWaterFraction)
                        .basalMetabolicRate(basalMetabolicRate)
                        .musculoskeletalMass(musculoskeletalMass)
                        .musculoskeletalRate(musculoskeletalRate)
//                        .createdDate(formattedDate)
//                        .updatedDate(formattedDate)
                        .build());
            }
        } catch (IOException e) {
            // EXCEPTION PROCESS FOR READ CSV FILE
            e.printStackTrace();
        } catch (Exception e) {
            // EXCEPTION PROCESS FOR READ LINES
            e.printStackTrace();
        }
    }
}