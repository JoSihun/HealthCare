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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    /** 고객지원 LiveChatRoom 목록조회 - 생성순, List */
    @Transactional
    public List<ChatRoomResponseDto> findALlAsc() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAll(sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }

    /** 고객지원 LiveChatRoom 목록조회 - 최신순, List */
    @Transactional
    public List<ChatRoomResponseDto> findALlDesc() {
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        List<ChatRoom> chatRoomList = this.chatRoomRepository.findAll(sort);
        return chatRoomList.stream().map(ChatRoomResponseDto::new).collect(Collectors.toList());
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /** 고객지원 LiveChatRoom 조회 */
    @Transactional
    public ChatRoomResponseDto findById(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChatRoom이 존재하지 않습니다. id = " + id));
        return new ChatRoomResponseDto(entity);
    }

    /** 고객지원 LiveChatRoom 저장 */
    @Transactional
    public Long save(final ChatRoomRequestDto requestDto) {
        return this.chatRoomRepository.save(requestDto.toEntity()).getId();
    }

    /** 고객지원 LiveChatRoom 삭제 */
    @Transactional
    public Long delete(final Long id) {
        ChatRoom entity = this.chatRoomRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("해당 고객지원 LiveChatRoom이 존재하지 않습니다. id = " + id));
        this.chatRoomRepository.delete(entity);
        return id;
    }
}
