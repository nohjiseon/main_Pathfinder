package com.pathfinder.server.auth.jwt.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Member member = findByEmail(email);

        checkWithdrawMember(member);

        return createUserDetails(member);
    }

    private Member findByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("이메일이 존재하지 않습니다."));
    }

    private void checkWithdrawMember(Member member) {
        if(memberRepository.existsById(member.getMemberId())) throw new UsernameNotFoundException("존재하지 않는 회원입니다.");
    }

    private UserDetails createUserDetails(Member member) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());

        return new CustomUserDetails(
                member.getMemberId(),
                member.getName(),
                member.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
