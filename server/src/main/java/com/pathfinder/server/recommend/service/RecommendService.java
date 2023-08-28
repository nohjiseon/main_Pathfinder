package com.pathfinder.server.recommend.service;

import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.service.MemberService;
import com.pathfinder.server.recommend.entity.Recommend;
import com.pathfinder.server.recommend.repository.RecommendRepository;
import com.pathfinder.server.thread.entity.Thread;
import com.pathfinder.server.thread.service.ThreadService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecommendService {
    private final RecommendRepository recommendRepository;
    private final MemberService memberService;
    private final ThreadService threadService;

    public RecommendService(RecommendRepository recommendRepository, MemberService memberService, ThreadService threadService) {
        this.recommendRepository = recommendRepository;
        this.memberService = memberService;
        this.threadService = threadService;
    }

    public void toggleRecommend(Long memberId, Long threadId) {
        Optional<Recommend> optionalRecommend = recommendRepository.findByMemberIdAndThreadId(memberId, threadId);

        if (optionalRecommend.isPresent()) {
            recommendRepository.delete(optionalRecommend.get());
        } else {
            Member member = memberService.findVerifiedMember(memberId);
            Thread thread = threadService.findVerifiedThread(threadId);
            Recommend recommend = new Recommend();
            recommend.setMember(member);
            recommend.setThread(thread);
            recommendRepository.save(recommend);
        }
    }
}
