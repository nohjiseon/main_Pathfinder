package com.pathfinder.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class MemberDto {
    public static class Post {
        @NotBlank
        private String name;
        @NotBlank
        private String password;
        @NotBlank
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
