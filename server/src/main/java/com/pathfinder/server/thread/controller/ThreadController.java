package com.pathfinder.server.thread.controller;

import com.pathfinder.server.dto.MultiResponseDto;
import com.pathfinder.server.dto.SingleResponseDto;
import com.pathfinder.server.thread.entity.Thread;
import com.pathfinder.server.thread.dto.ThreadDto;
import com.pathfinder.server.thread.mapper.ThreadMapper;
import com.pathfinder.server.thread.service.ThreadService;
import com.pathfinder.server.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/thread")
public class ThreadController {
    private final static String THREAD_DEFAULT_URL = "/thread";
    private ThreadService threadService;
    private ThreadMapper mapper;

    public ThreadController(ThreadService threadService, ThreadMapper mapper) {
        this.threadService = threadService;
        this.mapper = mapper;
    }

    @PostMapping("/registration") // 게시글 생성
    public ResponseEntity postQuestion(@RequestBody ThreadDto.Post threadPostDto) {
        Thread thread = threadService.createQuestion(mapper.threadPostDtoToThread(threadPostDto));

        URI location = UriCreator.createUri(THREAD_DEFAULT_URL, thread.getThreadId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{thread-id}") //게시글 자세히 보기
    public ResponseEntity getThread(@PathVariable("thread-id") Long threadId){
        Thread thread = threadService.getThread(threadId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.threadToThreadResponseDto(thread)),
                HttpStatus.OK);
    }

    @GetMapping // 전체 게시글 조회
    public ResponseEntity getThreads(@RequestParam int page) {
        Page<Thread> pageThreads = threadService.getThreads(page - 1);

        List<Thread> threads = pageThreads.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.threadsToThreadResponseDtos(threads),
                        pageThreads),
                HttpStatus.OK);
    }
    @GetMapping("/area/{area1}") // area1을 갖는 게시글 조회
    public ResponseEntity getThreadsByRegion(@PathVariable("area1") String area1,
                                             @RequestParam int page) {
        Page<Thread> pageThreads = threadService.getThreadsByRegion(area1, PageRequest.of(page - 1,10, Sort.by(Sort.Direction.DESC,"threadId")));

        List<Thread> threads = pageThreads.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.threadsToThreadResponseDtos(threads),
                        pageThreads),
                HttpStatus.OK);
    }

    @PatchMapping("/edit/{thread-id}")
    public ResponseEntity patchThread(@PathVariable("thread-id") long threadId,
                                      @RequestBody ThreadDto.Patch threadPatchDto) {
        threadPatchDto.setThreadId(threadId);
        Thread thread = threadService.updateThread(mapper.threadPatchDtoToThread(threadPatchDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.threadToThreadResponseDto(thread)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{thread-id}")
    public ResponseEntity deleteThread(@PathVariable("thread-id") Long threadId){
        threadService.deleteThread(threadId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
