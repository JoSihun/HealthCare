package com.shyd.healthcare.service;

import com.shyd.healthcare.dto.websocket.WebSocketChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class WebSocketChatService {
    private Map<String, WebSocketChatRoomDto> chatRoomDtoMap = new LinkedHashMap<>();

//    @PostConstruct
//    private void init() {
//        chatRoomDtoMap = new LinkedHashMap<>();
//    }

//    public List<WebSocketChatRoomDto> findAllRoom() {
//        List<WebSocketChatRoomDto> chatRoomDtoList = new ArrayList<>(chatRoomDtoMap.values());
//        Collections.reverse(chatRoomDtoList);
//        return chatRoomDtoList;
//    }

    public WebSocketChatRoomDto findByChatRoomId(String roomId) {
        return chatRoomDtoMap.get(roomId);
    }

    public WebSocketChatRoomDto createChatRoom() {
        WebSocketChatRoomDto webSocketChatRoomDto = new WebSocketChatRoomDto();
        chatRoomDtoMap.put(webSocketChatRoomDto.getRoomId(), webSocketChatRoomDto);
        return webSocketChatRoomDto;
    }
}
