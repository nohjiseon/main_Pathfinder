package com.pathfinder.server.thread.service;

import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.service.MemberService;
import com.pathfinder.server.thread.entity.Thread;
import com.pathfinder.server.exception.BusinessLogicException;
import com.pathfinder.server.exception.ExceptionCode;
import com.pathfinder.server.thread.repository.ThreadRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ThreadService {
    private final ThreadRepository threadRepository;
    private final MemberService memberService;

    public ThreadService(ThreadRepository threadRepository, MemberService memberService) {
        this.threadRepository = threadRepository;
        this.memberService = memberService;
    }

    public Thread createThread(Thread thread) {
        verifyThreadGetMemberName(thread);

        return threadRepository.save(thread);
    }

    public Thread updateThread(Thread thread){
        Thread findThread = findVerifiedThread(thread.getThreadId());
        Optional.ofNullable(thread.getTitle())
                .ifPresent(title -> findThread.setTitle(title));
        Optional.ofNullable(thread.getContent())
                .ifPresent(content -> findThread.setContent(content));
        Optional.ofNullable(thread.getArea1())
                .ifPresent(area1 -> findThread.setArea1(area1));
        Optional.ofNullable(thread.getArea2())
                .ifPresent(area2 -> findThread.setArea2(area2));
        return threadRepository.save(findThread);
    }

    public Thread getThread(Long threadId){
        Thread findThread = findVerifiedThread(threadId);
        findThread.setViews(findThread.getViews() + 1); // 조회수 증가
        findThread.setRecommendedCount(findThread.getRecommends().stream().count());

        return threadRepository.save(findThread);
    }

    public Page<Thread> getThreads(int page){
        return threadRepository.findAll(PageRequest.of(page, 10, Sort.by("threadId").descending()));
    }

    public Page<Thread> getThreadsByRegion(String area1, int page){
        return threadRepository.findByArea1(area1, PageRequest.of(page - 1,10, Sort.by("threadId").descending()));
    }

    public void deleteThread(Long threadId) {
        Thread findThread = findVerifiedThread(threadId);

        threadRepository.delete(findThread);
    }

    public Thread findVerifiedThread(Long threadId) {
        Optional<Thread> optionalQuestion = threadRepository.findById(threadId);
        Thread findThread = optionalQuestion.orElseThrow(()-> new BusinessLogicException(ExceptionCode.THREAD_NOT_FOUND));
        return findThread;
    }
    private void verifyThreadGetMemberName(Thread thread){
        thread.setName(thread.getMember().getName());
    }


}
