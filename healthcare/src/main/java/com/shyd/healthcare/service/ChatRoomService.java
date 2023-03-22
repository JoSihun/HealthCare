package com.shyd.healthcare.service;

import com.shyd.healthcare.domain.ChatRoom;
import com.shyd.healthcare.dto.livechat.ChatRoomRequestDto;
import com.shyd.healthcare.dto.livechat.ChatRoomResponseDto;
import com.shyd.healthcare.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    /** LiveChat Room 목록조회 - 작성순, List */
    @Transactional
    public List<ChatRoomResponseDto> findAllAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAll(sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }

    /** LiveChat Room 목록조회 - 최신순, List */
    @Transactional
    public List<ChatRoomResponseDto> findALlDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAll(sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** [임시] 특정유저 LiveChat Room 목록조회 - 작성순, List */
    @Transactional
    public List<ChatRoomResponseDto> findAllByUserIdAsc(String userId) {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAllByRoomName(userId, sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }

    /** [임시] 특정유저 LiveChat Room 목록조회 - 최신순, List */
    @Transactional
    public List<ChatRoomResponseDto> findAllByUserIdDesc(String userId) {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAllByRoomName(userId, sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** LiveChat Room 조회 - Uuid 검색 */
    @Transactional
    public ChatRoomResponseDto findByUuid(final String uuid) {
        ChatRoom entity = this.chatRoomRepository.findByUuid(uuid);
        return new ChatRoomResponseDto(entity);
    }

    @Transactional
    public Long create(String roomName) {
        ChatRoomRequestDto requestDto = new ChatRoomRequestDto();
        requestDto.setUuid(UUID.randomUUID().toString());
        requestDto.setRoomName(roomName);
        requestDto.setAnswerYn(false);
        return this.chatRoomRepository.save(requestDto.toEntity()).getId();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** LiveChat Room 조회 */
    @Transactional
    public ChatRoomResponseDto findById(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + id));
        return new ChatRoomResponseDto(entity);
    }

    /** LiveChat Room 생성 */
    @Transactional
    public Long save(final ChatRoomRequestDto requestDto) {
        return this.chatRoomRepository.save(requestDto.toEntity()).getId();
    }

    /** LiveChat Room 수정 */
    @Transactional
    public Long update(final Long chatRoomId, ChatRoomRequestDto requestDto) {
        ChatRoom entity = this.chatRoomRepository.findById(chatRoomId).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + chatRoomId));
        return entity.update(requestDto);
    }

    /** LiveChat Room 삭제 */
    public void delete(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChat Room이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
    }
}
