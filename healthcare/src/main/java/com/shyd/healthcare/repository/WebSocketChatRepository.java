//package com.shyd.healthcare.repository;
//
//import com.shyd.healthcare.dto.websocket.WebSocketChatRoomDto;
//import org.springframework.stereotype.Repository;
//
//import javax.annotation.PostConstruct;
//import java.util.*;
//
//@Repository
//public class WebSocketChatRepository {
//    // 추후 JPA를 사용하여 DB에 저장할 수 있도록 수정요망
//    // 사실 여기 내용이 Service 단으로 가야하는 걸지도 모름
//    private Map<String, WebSocketChatRoomDto> chatRoomDtoMap;
//
//    @PostConstruct
//    private void init() {
//        chatRoomDtoMap = new LinkedHashMap<>();
//    }
//
//    public List<WebSocketChatRoomDto> findAllRoom() {
//        List<WebSocketChatRoomDto> chatRoomDtoList = new ArrayList<>(chatRoomDtoMap.values());
//        Collections.reverse(chatRoomDtoList);
//        return chatRoomDtoList;
//    }
//
//    public WebSocketChatRoomDto findByChatRoomId(String roomId) {
//        return chatRoomDtoMap.get(roomId);
//    }
//
//    public WebSocketChatRoomDto createChatRoom(String roomName) {
//        WebSocketChatRoomDto chatRoomDto = WebSocketChatRoomDto.create(roomName);
//        chatRoomDtoMap.put(chatRoomDto.getRoomId(), chatRoomDto);
//        return chatRoomDto;
//    }
//
//}
