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
        private String name;
        @NotNull
        private String password;
        @NotNull
        @Email
        private String email;
    }

    public static class Patch {
        private long memberId;
        @Email
        private String email;
        private String password;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    public static class Response {
        private String name;
        private String email;
//        private String profileImageUrl;
    }
}
