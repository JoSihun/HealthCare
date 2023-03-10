package com.shyd.healthcare.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shyd.healthcare.dto.websocket.WebSocketChatRoomDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class WebSocketChatService {
    private Map<String, WebSocketChatRoomDto> chatRoomDtoMap;

    @PostConstruct
    private void init() {
        chatRoomDtoMap = new LinkedHashMap<>();
    }

    public List<WebSocketChatRoomDto> findAllRoom() {
        List<WebSocketChatRoomDto> chatRoomDtoList = new ArrayList<>(chatRoomDtoMap.values());
        Collections.reverse(chatRoomDtoList);
        return chatRoomDtoList;
    }

    public WebSocketChatRoomDto findByChatRoomId(String roomId) {
        return chatRoomDtoMap.get(roomId);
    }

    public WebSocketChatRoomDto createChatRoom(String roomName) {
        WebSocketChatRoomDto chatRoomDto = WebSocketChatRoomDto.create(roomName);
        chatRoomDtoMap.put(chatRoomDto.getRoomId(), chatRoomDto);
        return chatRoomDto;
    }
}
