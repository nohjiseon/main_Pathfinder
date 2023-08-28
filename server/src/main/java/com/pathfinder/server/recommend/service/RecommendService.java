package com.pathfinder.server.recommend.service;

import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.service.MemberService;
import com.pathfinder.server.recommend.entity.Recommend;
import com.pathfinder.server.recommend.repository.RecommendRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecommendService {
    private final RecommendRepository recommendRepository;
    private final MemberService memberService;
//    private final ThreadService threadService;

    public RecommendService(RecommendRepository recommendRepository, MemberService memberService) {
        this.recommendRepository = recommendRepository;
        this.memberService = memberService;
    }

    public void toggleRecommend(Long memberId, Long threadId) {
        Optional<Recommend> optionalRecommend = recommendRepository.findByMemberIdAndThreadId(memberId, threadId);

        if (optionalRecommend.isPresent()) {
            recommendRepository.delete(optionalRecommend.get());
        } else {
            Member member = memberService.findById(memberId);
//            Thread thread = threadService.findById(threadId);
            Recommend recommend = new Recommend();
            recommend.setMember(member);
//            recommend.setThread(thread);
            recommendRepository.save(recommend);
        }
    }
}
