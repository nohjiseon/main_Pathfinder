package com.pathfinder.server.member.service;

import com.pathfinder.server.exception.BusinessLogicException;
import com.pathfinder.server.exception.ExceptionCode;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        if (!verifyExistsName((member.getName())) && !verifyExistsEmail(member.getEmail())) {
            // todo 회원가입
        }
        return null;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
//        Optional.ofNullable(member.getPassword())
//                .ifPresent(password -> todo 비밀번호 변경);
        // 이미지 변경
//        Optional.ofNullable(member.getProfileImageUrl())
//                .ifPresent(image -> findMember.setProfileImageUrl(image));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    private Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findMember;
    }

    private boolean verifyExistsName(String name) {
        Optional<Member> member = memberRepository.findByName(name);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NAME_EXISTS);
        }
        return false;
    }

    private boolean verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        }
        return false;
    }

    public Member findById(Long memberId) {
        return memberRepository.findById(memberId).orElse(null);
    }
}
