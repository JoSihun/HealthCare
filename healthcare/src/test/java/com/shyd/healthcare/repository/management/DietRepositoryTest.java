package com.shyd.healthcare.repository.management;

import com.shyd.healthcare.domain.management.Diet;
import com.shyd.healthcare.domain.management.DietMainCategory;
import com.shyd.healthcare.domain.management.DietSubCategory;
import com.shyd.healthcare.dto.management.diet.DietResponseDto;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class DietRepositoryTest {
    @Autowired
    private DietRepository dietRepository;
    @Autowired
    private DietMainCategoryRepository mainCategoryRepository;
    @Autowired
    private DietSubCategoryRepository subCategoryRepository;

    private String getRequestURL(Integer pageNo, Integer pageSize) throws IOException {
        // INITIALIZE SERVICE KEY AND REQUEST URL
        String serviceKey = "PxdsnRGoDtzCABQXD3VELgrYeUlROjLiZxl7MGykEkhdsQyR5nOUJ1JgWLlWhc88OPbIidC1pxPptgsu7tqQqQ%3D%3D";
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1390802/AgriFood/FdFoodCkryImage/getKoreanFoodFdFoodCkryImageList");

        // SET QUERY STRING / SERVICE_KEY, SERVICE_TYPE, PAGE_NO, PAGE_SIZE
        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + serviceKey);
        urlBuilder.append("&" + URLEncoder.encode("service_Type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("Page_No","UTF-8") + "=" + URLEncoder.encode(pageNo.toString(), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("Page_Size","UTF-8") + "=" + URLEncoder.encode(pageSize.toString(), "UTF-8"));
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

    private void jsonResponseParse(String httpResponse, Map<String, Set<String>> categories) throws ParseException {
        // RESPONSE PARSING
        JSONParser parser = new JSONParser();
        JSONObject object = (JSONObject) parser.parse(httpResponse);

        JSONObject response = (JSONObject) object.get("response");
        Integer currPage = (Integer) response.get("page_No");
        Integer elemCnt = (Integer) response.get("rcdcnt");
        Integer totalCnt = (Integer) response.get("total_Count");
        JSONArray list = (JSONArray) response.get("list");

//        System.out.print("전체페이지/현재페이지: " + totalCnt / elemCnt + 1 + "/" + currPage + " | ");
//        System.out.print("보기옵션: " + elemCnt + " | ");
//        System.out.println("전체개수/햔재개수: " + totalCnt + "/" + currPage * elemCnt);


        // DETAIL PARSING
        for (int i = 0; i < list.size(); i++) {
            JSONObject element = (JSONObject) list.get(i);
            Integer no = (Integer) element.get("no");
            String mainCategory = (String) element.get("upper_Fd_Grupp_Nm");
            String subCategory = (String) element.get("fd_Grupp_Nm");
            String foodName = (String) element.get("fd_Nm");
            String foodWeight = (String) element.get("fd_Wgh");
            String imageAddress = (String) element.get("ckry_Image_Address");

            DietMainCategory dietMainCategory = this.mainCategoryRepository.save(DietMainCategory.builder()
                            .categoryName(mainCategory)
                            .build());
            DietSubCategory dietSubCategory = this.subCategoryRepository.save(DietSubCategory.builder()
                            .categoryName(subCategory)
                            .mainCategory(dietMainCategory)
                            .build());
            this.dietRepository.save(Diet.builder()
                            .foodName(foodName)
                            .foodWeight(foodWeight)
                            .imageAddress(imageAddress)
                            .mainCategory(dietMainCategory)
                            .subCategory(dietSubCategory).build());

//            if (!categories.containsKey(mainCategory)) {
//                categories.put(mainCategory, new HashSet<>());
//            }
//            Set<String> values = categories.get(mainCategory);
//            values.add(subCategory);
//            categories.put(mainCategory, values);

//            System.out.print("식별번호: " + no + " | ");
//            System.out.print("대분류: " + mainCategory + " | ");
//            System.out.print("중분류: " + subCategory + " | ");
//            System.out.print("음식명: " + foodName + " | ");
//            System.out.print("중량: " + foodWeight + " | ");
//            System.out.println("이미지주소: " + imageAddress);
        }


    }

    @Test
    @DisplayName("식단 데이터 전처리 삽입")
    void saveHugeDataTest() {
        try {
            Map<String, Set<String>> categories = new HashMap<>();
            // total: 1866 | pageSize: 20 | maxPage: 1866 // 20 + 1 = 94
            for (int i = 1; i <= 94; i++) {
                String httpRequestURL = getRequestURL(i, 20);
                HttpURLConnection conn = connectHttpURL(httpRequestURL);
                String httpResponse = getHttpResponse(conn);
                System.out.println(httpResponse);

                // GET RESPONSE AS PARSED JSON
                jsonResponseParse(httpResponse, categories);
            }

//            for (String key: categories.keySet()) {
//                System.out.print("대분류: " + key + " | ");
//                System.out.println("중분류: " + categories.get(key).toString());
//            }


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
