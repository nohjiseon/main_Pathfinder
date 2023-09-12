package com.pathfinder.server.reward.service;

import com.pathfinder.server.global.exception.rewardexception.RewardNotFoundException;
import com.pathfinder.server.global.exception.rewardexception.RewardNotUnlockException;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.reward.entity.Reward;
import com.pathfinder.server.reward.repository.RewardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class RewardService {
    private RewardRepository rewardRepository;
    public RewardService(RewardRepository rewardRepository) {
        this.rewardRepository = rewardRepository;
    }
    public List<Reward> createInitRewards() { //회원가입 시 멤버별 보상 초기화 메서드
        Reward reward1 = new Reward();
        reward1.setName("그냥 꽁치");
        reward1.setRequirement(1);
        reward1.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/꽁치.png");
        reward1.setUnlocked(false);

        Reward reward2 = new Reward();
        reward2.setName("횟집사장 참치");
        reward2.setRequirement(3);
        reward2.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/참치.png");
        reward2.setUnlocked(false);

        Reward reward3 = new Reward();
        reward3.setName("디자이너 흰동가리");
        reward3.setRequirement(5);
        reward3.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/흰동가리.png");
        reward3.setUnlocked(false);

        Reward reward4 = new Reward();
        reward4.setName("자원봉사자 개복치");
        reward4.setRequirement(10);
        reward4.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/개복치.png");
        reward4.setUnlocked(false);

        Reward reward5 = new Reward();
        reward5.setName("음악가 고래");
        reward5.setRequirement(20);
        reward5.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/고래.png");
        reward5.setUnlocked(false);

        Reward reward6 = new Reward();
        reward6.setName("미용사 소라게");
        reward6.setRequirement(30);
        reward6.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/소라게.png");
        reward6.setUnlocked(false);

        Reward reward7 = new Reward();
        reward7.setName("골목대장 범고래");
        reward7.setRequirement(50);
        reward7.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/범고래.png");
        reward7.setUnlocked(false);

        Reward reward8 = new Reward();
        reward8.setName("탐험가 펭귄");
        reward8.setRequirement(100);
        reward8.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/펭귄.png");
        reward8.setUnlocked(false);

        Reward reward9 = new Reward();
        reward9.setName("백수 물범");
        reward9.setRequirement(200);
        reward9.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/물범.png");
        reward9.setUnlocked(false);

        Reward reward10 = new Reward();
        reward10.setName("수영강사 해달");
        reward10.setRequirement(365);
        reward10.setImageUrl("https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/reward/캐릭터+오픈+전/해달.png");
        reward10.setUnlocked(false);

        return Arrays.asList(reward1,reward2,reward3,reward4,reward5,reward6,reward7,reward8,reward9,reward10);
    }

    public Page<Reward> getRewardsByMember(Long memberId){ //멤버의 보상 현황 조회

        return rewardRepository.findByMemberMemberId(memberId, PageRequest.of(0,10, Sort.by("rewardId")));
    }

    public void unlockRewards(Member member, List<Reward> rewards) { //보상 조건별 잠금해제 로직
        rewards.stream()
                .filter(reward -> checkUnlockCondition(member, reward))
                .forEach(reward -> {
                    reward.setUnlocked(true);
                    rewardRepository.save(reward);
                });
    }
    private boolean checkUnlockCondition(Member member, Reward reward) { //보상 조건 만족 시 이미지 URL 변경 로직
        if(member.getDiaryCount() == reward.getRequirement()) {
            reward.setImageUrl(UnlockImage.getUrlByValue(reward.getRequirement()));
            return true;
        }

        return false;
    }

    public Reward findReward(Long rewardId){
        Optional<Reward> optionalReward = rewardRepository.findById(rewardId);
        Reward findReward = optionalReward.orElseThrow(()-> new RewardNotFoundException());
        if(!findReward.isUnlocked()){
            throw new RewardNotUnlockException();
        }
        return findReward;
    }
}
