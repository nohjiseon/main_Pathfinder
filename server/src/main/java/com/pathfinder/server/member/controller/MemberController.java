package com.pathfinder.server.member.controller;

import com.pathfinder.server.dto.SingleResponseDto;
import com.pathfinder.server.member.dto.MemberDto;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.mapper.MemberMapper;
import com.pathfinder.server.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/member")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
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
}
