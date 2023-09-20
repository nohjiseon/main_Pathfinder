package com.pathfinder.server.member.controller;

import com.pathfinder.server.dto.MultiResponseDto;
import com.pathfinder.server.dto.SingleResponseDto;
import com.pathfinder.server.member.dto.MemberDto;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.mapper.MemberMapper;
import com.pathfinder.server.member.service.MemberService;
import com.pathfinder.server.reward.entity.Reward;
import com.pathfinder.server.reward.mapper.RewardMapper;
import com.pathfinder.server.reward.service.RewardService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/member")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final RewardService rewardService;
    private final RewardMapper rewardMapper;


    public MemberController(MemberService memberService, MemberMapper mapper, RewardService rewardService, RewardMapper rewardMapper) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.rewardService = rewardService;
        this.rewardMapper = rewardMapper;
    }

    @PatchMapping("/mypage/{member-id}")
    public ResponseEntity memberPatch(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/mypage/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/mypage/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member))
                , HttpStatus.OK
        );
    }
    @GetMapping("/reward/{member-id}") // 멤버별 Reward 조회
    public ResponseEntity getRewardByMember(@PathVariable("member-id") @Positive long memberId){
        Page<Reward> pageRewards = rewardService.getRewardsByMember(memberId);

        List<Reward> rewards = pageRewards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(rewardMapper.RewardsToRewardResponseDtos(rewards),pageRewards)
                , HttpStatus.OK
        );
    }

    @PatchMapping("/reward/{member-id}/{reward-id}")
    public ResponseEntity updateProfileImage(@PathVariable("member-id") @Positive long memberId,
                                             @PathVariable("reward-id") @Positive long rewardId){

        memberService.updateProfileImage(memberId,rewardId);

        return new ResponseEntity(HttpStatus.OK);
    }
}
