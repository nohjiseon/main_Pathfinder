package com.pathfinder.server.thread.mapper;

import com.pathfinder.server.thread.dto.ThreadDto;
import com.pathfinder.server.thread.entity.Thread;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ThreadMapper {
    Thread threadPostDtoToThread(ThreadDto.Post threadPostDto);
    Thread threadPatchDtoToThread(ThreadDto.Patch threadPatchDto);
    ThreadDto.Response threadToThreadResponseDto(Thread thread);
    List<ThreadDto.Response> threadsToThreadResponseDtos(List<Thread> threads);
}
