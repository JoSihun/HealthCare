package com.shyd.healthcare.service.support;

import com.shyd.healthcare.config.JwtTokenProvider;
import com.shyd.healthcare.domain.support.livechat.ChatRoom;
import com.shyd.healthcare.domain.support.livechat.UserChatRoom;
import com.shyd.healthcare.domain.user.User;
import com.shyd.healthcare.dto.support.livechat.ChatRoomRequestDTO;
import com.shyd.healthcare.dto.support.livechat.ChatRoomResponseDTO;
import com.shyd.healthcare.repository.support.ChatRoomRepository;
import com.shyd.healthcare.repository.support.UserChatRoomRepository;
import com.shyd.healthcare.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository chatRoomRepository;
    private final UserChatRoomRepository userChatRoomRepository;

    /** ChatRoom 목록조회 - List */
    @Transactional
    public List<ChatRoomResponseDTO> findAll(String sortOption) {
        Sort.Direction direction = sortOption.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "id");
        List<ChatRoom> chatRooms = chatRoomRepository.findAll(sort);
        return chatRooms.stream().map(ChatRoomResponseDTO::new).collect(Collectors.toList());
    }

    /** ChatRoom 목록조회 - Page */
    @Transactional
    public Page<ChatRoomResponseDTO> findAll(Integer page, Integer size, String sortOption) {
        Sort.Direction direction = sortOption.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort);
        Page<ChatRoom> chatRooms = chatRoomRepository.findAll(pageable);
        return chatRooms.map(ChatRoomResponseDTO::new);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 목록조회 - 특정유저 검색, List */
    @Transactional
    public List<ChatRoomResponseDTO> findAllByUserId(String accessToken, String sortOption) {
        Sort.Direction direction = sortOption.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "id");

        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        List<ChatRoom> chatRooms = this.userChatRoomRepository.findAllByUser(user, sort).stream()
                .map(UserChatRoom::getChatRoom)
                .collect(Collectors.toList());
        return chatRooms.stream().map(ChatRoomResponseDTO::new).collect(Collectors.toList());
    }

    /** ChatRoom 목록조회 - 특정유저 검색, Page */
    @Transactional
    public Page<ChatRoomResponseDTO> findAllByUserId(String accessToken, Integer page, Integer size, String sortOption) {
        Sort.Direction direction = sortOption.equalsIgnoreCase("asc")
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;
        Sort sort = Sort.by(direction, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        Page<ChatRoom> chatRooms = this.userChatRoomRepository.findAllByUser(user, pageable)
                .map(UserChatRoom::getChatRoom);
        return chatRooms.map(ChatRoomResponseDTO::new);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 검색조회 - Uuid 검색 */
    @Transactional
    public ChatRoomResponseDTO findByUuid(String uuid) {
        ChatRoom chatRoom = this.chatRoomRepository.findByUuid(uuid);
        return new ChatRoomResponseDTO(chatRoom);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** ChatRoom 조회 */
    @Transactional
    public ChatRoomResponseDTO findById(Long id) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatRoom_id = " + id));
        return new ChatRoomResponseDTO(chatRoom);
    }

    /** ChatRoom 생성 */
    @Transactional
    public Long create(String accessToken, ChatRoomRequestDTO requestDTO) {
        Long userId = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        User user = this.userRepository.findById(userId).orElseThrow(
                () -> new IllegalArgumentException("해당 유저를 찾을 수 없습니다. user_id = " + userId));
        ChatRoom chatRoom = this.chatRoomRepository.save(requestDTO.toEntity());
        this.userChatRoomRepository.save(UserChatRoom.builder().user(user).chatRoom(chatRoom).build());
        return chatRoom.getId();
    }

    /** ChatRoom 수정 */
    @Transactional
    public Long update(Long id, ChatRoomRequestDTO requestDTO) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatRoom_id = " + id));
        return chatRoom.update(requestDTO);
    }

    /** ChatRoom 삭제 */
    public void delete(final Long id) {
        ChatRoom chatRoom = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다. chatRoom_id = " + id));
        this.chatRoomRepository.delete(chatRoom);
    }
}
