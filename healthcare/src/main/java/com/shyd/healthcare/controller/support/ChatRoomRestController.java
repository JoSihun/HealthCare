package com.shyd.healthcare.controller.support;

import com.shyd.healthcare.dto.support.livechat.ChatRoomRequestDTO;
import com.shyd.healthcare.dto.support.livechat.ChatRoomResponseDTO;
import com.shyd.healthcare.service.support.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatRoomRestController {
    private final ChatRoomService chatRoomService;

    /** ChatRoom 목록조회 - 고객용, List */
    @GetMapping("/api/v1/livechat/list")
    public List<ChatRoomResponseDTO> fetchChatRoom(@RequestHeader("Authorization") String accessToken,
                                                   @RequestParam(value = "sort", required = false, defaultValue = "desc") String sort) {
        return this.chatRoomService.findAllByUserId(accessToken, sort);
    }

    /** ChatRoom 목록조회 - 고객용, Page */
    @GetMapping("/api/v1/livechat/page")
    public Page<ChatRoomResponseDTO> fetchChatRoom(@RequestHeader("Authorization") String accessToken,
                                                   @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                                   @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
                                                   @RequestParam(value = "sort", required = false, defaultValue = "desc") String sort) {
        return this.chatRoomService.findAllByUserId(accessToken, page, size, sort);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 목록조회 - 관리자용, List */
    @GetMapping("/api/v1/admin/livechat/list")
    public List<ChatRoomResponseDTO> fetchChatRoom(@RequestParam(value = "sort", required = false, defaultValue = "desc") String sort) {
        return this.chatRoomService.findAll(sort);
    }

    /** ChatRoom 목록조회 - 관리자용, Page */
    @GetMapping("/api/v1/admin/livechat/page")
    public Page<ChatRoomResponseDTO> fetchChatRoom(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                                   @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
                                                   @RequestParam(value = "sort", required = false, defaultValue = "desc") String sort) {
        return this.chatRoomService.findAll(page, size, sort);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 조회 - Uuid 검색 */
    @GetMapping("/api/v1/livechat/room")
    public ChatRoomResponseDTO readChatRoom(@RequestParam(value = "uuid") String uuid) {
        return this.chatRoomService.findByUuid(uuid);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 조회 */
    @GetMapping("/api/v1/livechat/room/{id}")
    public ChatRoomResponseDTO readChatRoom(@PathVariable Long id) {
        return this.chatRoomService.findById(id);
    }

    /** ChatRoom 생성 */
    @PostMapping("/api/v1/livechat/room")
    public Long saveChatRoom(@RequestHeader("Authorization") String accessToken,
                             @RequestBody ChatRoomRequestDTO requestDTO) {
        return this.chatRoomService.create(accessToken, requestDTO);
    }

    /** ChatRoom 수정 */
    @PutMapping("/api/v1/livechat/room/{id}")
    public Long updateChatRoom(@PathVariable Long id,
                               @RequestBody ChatRoomRequestDTO requestDTO) {
        return this.chatRoomService.update(id, requestDTO);
    }

    /** ChatRoom 삭제 */
    @DeleteMapping("/api/v1/livechat/room/{id}")
    public void deleteChatRoom(@PathVariable Long id) {
        this.chatRoomService.delete(id);
    }
}
