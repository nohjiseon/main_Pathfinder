package com.pathfinder.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class MemberDto {
    @Getter
    public static class Post {
        @NotNull
        @Email
        private String email;
        @NotNull
        private String name;
        @NotNull
        private String password;
        // todo 패스워드 vaild추가
    }

    public static class Patch {
        private long memberId;
        @Email
        private String email;
        private String password;
        // todo 패스워드 vaild추가
        private String introduce;
        private String profileImageUrl;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    public static class Response {
        private String name;
        private String email;
        private String introduce;
        private String profileImageUrl;
    }
}
