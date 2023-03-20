package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.livechat.ChatRoomRequestDto;
import com.shyd.healthcare.dto.livechat.ChatRoomResponseDto;
import com.shyd.healthcare.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ChatRoomRestController {
    private final ChatRoomService chatRoomService;

    /** LiveChat Room 목록조회 */
    @GetMapping("/api/livechat/list/{userId}")
    public List<ChatRoomResponseDto> readChatRoomList(@PathVariable String userId) {
        return this.chatRoomService.findAllByUserIdDesc(userId);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** LiveChat Room 조회 - Uuid 검색 */
    @GetMapping("/api/livechat/room")
    public ChatRoomResponseDto readChatRoom(@RequestParam(value = "uuid") String uuid) {
        return this.chatRoomService.findByUuid(uuid);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /** LiveChat Room 조회 - id 검색 */
    @GetMapping("/api/livechat/room/{id}")
    public ChatRoomResponseDto readChatRoom(@PathVariable Long id) {
        return this.chatRoomService.findById(id);
    }

    /** LiveChat Room 생성 */
    @PostMapping("/api/livechat/room")
    public Long saveChatRoom(@RequestBody ChatRoomRequestDto requestDto) {
        return this.chatRoomService.save(requestDto);
    }

    /** LiveChat Room 삭제 */
    @DeleteMapping("/api/livechat/room/{id}")
    public void deleteChatRoom(@PathVariable Long id) {
        this.chatRoomService.delete(id);
    }
}
