package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Food;
import com.shyd.healthcare.dto.management.food.FoodRequestDto;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@SpringBootTest
public class FoodRepositoryTest {
    @Autowired
    private FoodRepository foodRepository;

    private String getRequestURL(Integer pageNo, Integer pageSize) throws IOException {
        // INITIALIZE SERVICE KEY AND REQUEST URL
        String serviceKey = "PxdsnRGoDtzCABQXD3VELgrYeUlROjLiZxl7MGykEkhdsQyR5nOUJ1JgWLlWhc88OPbIidC1pxPptgsu7tqQqQ%3D%3D";
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1471000/FoodNtrIrdntInfoService1/getFoodNtrItdntList1");

        // SET QUERY STRING / SERVICE_KEY, PAGE_NO, PAGE_SIZE, RESPONSE_TYPE
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(pageNo.toString(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(pageSize.toString(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
        return urlBuilder.toString();
    }

    private HttpURLConnection connectHttpURL(String requestURL) throws IOException {
        URL url = new URL(requestURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        return conn;
    }

    private String getHttpResponse(HttpURLConnection conn) throws IOException {
        // READ BUFFER
        BufferedReader br;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        // CONVERT BUFFER TO STRING
        String line;
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null) {
            sb.append(line);
        }

        // DISCONNECT CONNECTION AND RETURN RESULT
        br.close();
        conn.disconnect();
        return sb.toString();
    }

    private Double convertItem(String number) {
        if (StringUtils.hasText(number) && !number.equals("N/A")) {
            return Double.parseDouble(number);
        }
        return null;
    }

    private void jsonResponseParse(String httpResponse) throws ParseException {
        // RESPONSE PARSING
        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(httpResponse);

        JSONObject body = (JSONObject) object.get("body");
        Integer pageNo = (Integer) body.get("pageNo");
        Integer numOfRows = (Integer) body.get("numOfRows");
        Integer totalCount = (Integer) body.get("totalCount");

        // 전체페이지: totalCnt / elemCnt + 1; 현재페이지: currPage;
        // 전체개수: totalCnt; | 현재개수: currPage * elemCnt;
        // 보기옵션: elemCnt;
        System.out.print("전체페이지/현재페이지: " + (totalCount / numOfRows + 1) + "/" + pageNo + " | ");
        System.out.print("보기옵션: " + numOfRows + " | ");
        System.out.println("전체개수/햔재개수: " + totalCount + "/" + pageNo * numOfRows);

        JSONArray items = (JSONArray) body.get("items");
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = (JSONObject) items.get(i);
            String foodName = (String) item.get("DESC_KOR");                            // 음식명
            Integer bgnYear = Integer.parseInt((String) item.get("BGN_YEAR"));          // 구축년도

            Double weight = convertItem((String) item.get("SERVING_WT"));                // 중량
            Double calories = convertItem((String) item.get("NUTR_CONT1"));              // 열량
            Double carbohydrates = convertItem((String) item.get("NUTR_CONT2"));         // 탄수화물
            Double protein = convertItem((String) item.get("NUTR_CONT3"));               // 단백질
            Double fat = convertItem((String) item.get("NUTR_CONT4"));                   // 지방
            Double sugars = convertItem((String) item.get("NUTR_CONT5"));                // 당류
            Double sodium = convertItem((String) item.get("NUTR_CONT6"));                // 나트륨
            Double cholesterol = convertItem((String) item.get("NUTR_CONT7"));           // 콜레스테롤
            Double saturatedFattyAcids = convertItem((String) item.get("NUTR_CONT8"));   // 포화지방산
            Double transFattyAcids = convertItem((String) item.get("NUTR_CONT9"));       // 트랜스지방산

            if (foodName == null) {
                System.out.print("음식명: " + foodName + " | 구축년도: " + bgnYear + " | 중량: " + weight + "g | 열량: " + calories + " | ");
                System.out.print("탄수화물: " + carbohydrates + " | 단백질: " + protein + " | 지방: " + fat + " | 당류: " + sugars + " | 나트륨: " + sodium + " | ");
                System.out.println("콜레스테롤: " + cholesterol + " | 포화지방산: " + saturatedFattyAcids + " | 트랜스지방산: " + transFattyAcids);
                continue;
            }

            FoodRequestDto requestDto = FoodRequestDto.builder()
                    .fats(fat)
                    .name(foodName)
                    .buildYear(bgnYear)
                    .weight(weight)
                    .sugars(sugars)
                    .sodium(sodium)
                    .proteins(protein)
                    .calories(calories)
                    .cholesterol(cholesterol)
                    .carbohydrates(carbohydrates)
                    .transFattyAcids(transFattyAcids)
                    .saturatedFattyAcids(saturatedFattyAcids)
                    .build();
            if (this.foodRepository.existsByName(foodName)) {
                Food food = this.foodRepository.findByName(foodName);
                if (food.getBuildYear() < requestDto.getBuildYear()) {
                    food.update(requestDto);
                }
            } else {
                this.foodRepository.save(requestDto.toEntity());
            }

        }
    }

    @Test
    @DisplayName("영양성분 포함 식단 데이터 출력")
    void saveData() throws IOException {
        try {
            // Total Elem: 22602 | PageSize: 100 | MaxPage: 227 = 22602 // 100 + 1
            for (int i = 1; i <= 227; i++) {
                String httpRequestURL = getRequestURL(i, 100);
                HttpURLConnection conn = connectHttpURL(httpRequestURL);
                String httpResponse = getHttpResponse(conn);
                System.out.println(httpResponse);

                // GET RESPONSE AS PARSED JSON
                jsonResponseParse(httpResponse);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
