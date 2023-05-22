package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.livechat.ChatMessageRequestDTO;
import com.shyd.healthcare.dto.support.livechat.ChatMessageResponseDTO;
import com.shyd.healthcare.dto.support.livechat.ChatRoomRequestDTO;
import com.shyd.healthcare.service.support.ChatMessageService;
import com.shyd.healthcare.service.support.ChatRoomService;
import com.shyd.healthcare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatMessageRestController {
    private final UserService userService;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;
    private final SimpMessageSendingOperations sendingOperations;

//    /** WebSocket Controller 기본 양식 */
//    @MessageMapping("/chat")
//    public void receiveMessage(@Payload ChatMessageRequestDto requestDto) {
//        sendingOperations.convertAndSend("/sub/chat", requestDto);
//    }
//
//    @MessageMapping("/chat")                // subscribe, publish url
//    public void receiveMessage(@Payload ChatMessageRequestDTO requestDTO) {
//        if (requestDTO.getRoomUuid() == null) {
//            Long chatRoomId = this.chatRoomService.create(requestDto.getSender());
//            ChatRoomResponseDTO chatRoomResponseDto = this.chatRoomService.findById(chatRoomId);
//
//            requestDto.setRoomUuid(chatRoomResponseDto.getUuid());
//            Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
//            ChatMessageResponseDTO chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);
//
//            String subscribeChannel = "/sub/chat/" + chatMessageResponseDto.getSender();
//            sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
//        } else {
//            Long chatRoomId = this.chatRoomService.findByUuid(requestDto.getRoomUuid()).getId();
//            Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
//            ChatMessageResponseDTO chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);
//
//            String subscribeChannel = "/sub/chat/" + chatMessageResponseDto.getRoomUuid();
//            sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
//        }
//    }
//
//    @MessageMapping("/chat/create")
//    public void receiveNewMessage(@Payload ChatMessageRequestDTO requestDto) {
//        Long chatRoomId = this.chatRoomService.findByUuid(requestDto.getRoomUuid()).getId();
//        Long chatMessageId = this.chatMessageService.save(chatRoomId, requestDto);
//        ChatRoomResponseDTO chatRoomResponseDto = this.chatRoomService.findById(chatRoomId);
//        ChatMessageResponseDTO chatMessageResponseDto = this.chatMessageService.findById(chatMessageId);
//
//        String subscribeChannel = "/sub/chat/" + chatRoomResponseDto.getUuid();
//        sendingOperations.convertAndSend(subscribeChannel, chatMessageResponseDto);
//    }

    /** ChatMessage 전송 - STOMP 웹소켓 요청 */
    @MessageMapping("/chat/{channel}")
    public void sendChatMessage(@Header("Authorization") String accessToken,
                                @DestinationVariable("channel") String channel,
                                @Payload ChatMessageRequestDTO chatMessageRequestDTO) {
        if (channel.equals("null")) {
            // CREATE A NEW CHAT ROOM IF CHANNEL IS NULL
            channel = this.userService.findByAccessToken(accessToken).getId().toString();
            ChatRoomRequestDTO chatRoomRequestDTO = new ChatRoomRequestDTO();
            Long chatRoomId = this.chatRoomService.create(accessToken, chatRoomRequestDTO);
            Long chatMessageId = this.chatMessageService.create(accessToken, chatRoomId, chatMessageRequestDTO);
            ChatMessageResponseDTO chatMessageResponseDTO = this.chatMessageService.findById(chatMessageId);
            messagingTemplate.convertAndSend("/sub/chat/" + channel, chatMessageResponseDTO);
        } else {
            // CREATE A NEW CHAT MESSAGE IF CHANNEL IS NOT NULL
            Long chatRoomId = this.chatRoomService.findByUuid(channel).getId();
            Long chatMessageId = this.chatMessageService.create(accessToken, chatRoomId, chatMessageRequestDTO);
            ChatMessageResponseDTO chatMessageResponseDTO = this.chatMessageService.findById(chatMessageId);
            messagingTemplate.convertAndSend("/sub/chat/" + channel, chatMessageResponseDTO);
        }
    }

    /** ChatMessage 목록조회 - STOMP 웹소켓 요청 */
    @SubscribeMapping("/sub/chat/{channel}")
    public List<ChatMessageResponseDTO> loadChatMessages(@DestinationVariable("channel") String channel) {
        return this.chatMessageService.findAllByChatRoomUuid(channel, "asc");
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatMessage 목록조회 - 특정 ChatRoom id, uuid 검색, List */
    @GetMapping("/api/v1/livechat/message")
    public List<ChatMessageResponseDTO> fetchChatMessages(@RequestParam(value = "chatRoom", required = false) Long chatRoomId,
                                                          @RequestParam(value = "uuid", required = false) String chatRoomUuid,
                                                          @RequestParam(value = "sort", required = false, defaultValue = "asc") String sort) {
        if (chatRoomId != null) {
            return this.chatMessageService.findAllByChatRoomId(chatRoomId, sort);
        }
        return this.chatMessageService.findAllByChatRoomUuid(chatRoomUuid, sort);
    }
}
