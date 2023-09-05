package com.pathfinder.server.member.service;

import com.pathfinder.server.exception.BusinessLogicException;
import com.pathfinder.server.exception.ExceptionCode;
import com.pathfinder.server.member.dto.MemberDto;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public Long signup(MemberDto.Post request) {

        verifyExistsEmail(request.getEmail());
        verifyExistsName(request.getName());

        //TODO email인증 로직 추가

        Member member = createMember(request);

        return memberRepository.save(member).getMemberId();
    }

    public Member createMember(MemberDto.Post request) {
        return Member.createMember(
                request.getEmail(),
                request.getName(),
                passwordEncoder.encode(request.getPassword())
        );
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getProfileImageUrl())
                .ifPresent(image -> findMember.setProfileImageUrl(image));
        Optional.ofNullable(member.getIntroduce())
                .ifPresent(introduce -> findMember.setIntroduce(introduce));

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(Long memberId) {
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

}
