package com.pathfinder.server.thread.service;

import com.pathfinder.server.thread.entity.Thread;
import com.pathfinder.server.exception.BusinessLogicException;
import com.pathfinder.server.exception.ExceptionCode;
import com.pathfinder.server.thread.repository.ThreadRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ThreadService {
    private final ThreadRepository threadRepository;

    public ThreadService(ThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    public Thread createQuestion(Thread thread) {
        return threadRepository.save(thread);
    }

    public Thread updateThread(Thread thread){
        Thread findThread = findVerifiedThread(thread.getThreadId());
        Optional.ofNullable(thread.getTitle())
                .ifPresent(title -> findThread.setTitle(title));
        Optional.ofNullable(thread.getContent())
                .ifPresent(content -> findThread.setContent(content));
//        findThread.setModifiedAt(LocalDateTime.now());
        return findThread;
    }

    public Thread getThread(Long threadId){
        Thread findThread = findVerifiedThread(threadId);
        findThread.setViews(findThread.getViews() + 1); // 조회수 증가
        return threadRepository.save(findThread);
    }

    public Page<Thread> getThreads(int page, int size){
        return threadRepository.findAll(PageRequest.of(page, size, Sort.by("threadId").descending()));
    }

    public void deleteThread(Long threadId) {
        Thread findThread = findVerifiedThread(threadId);

        threadRepository.delete(findThread);
    }

    private Thread findVerifiedThread(Long threadId) {
        Optional<Thread> optionalQuestion = threadRepository.findById(threadId);
        Thread findThread = optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.THREAD_NOT_FOUND));
        return findThread;
    }



}
