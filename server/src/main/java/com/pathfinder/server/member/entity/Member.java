package com.pathfinder.server.member.entity;

import com.pathfinder.server.recommend.entity.Recommend;
import com.pathfinder.server.diary.entity.Diary;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 30, nullable = false, updatable = false)
    private String name;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Authority authority;

    @Column(nullable = false)
    private String introduce = "안녕하세요.";

    @Column(nullable = false)
    private String profileImageUrl =
            "https://main20-pathfinder.s3.ap-northeast-2.amazonaws.com/profileimage.png";   // 기본 이미지

//    @ElementCollection(fetch = FetchType.EAGER) // 인가
//    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Recommend> recommends = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Diary> diaries = new ArrayList<>();

    public void setRecommend(Recommend recommend) {
        recommends.add(recommend);
        if (recommend.getMember() != this) {
            recommend.setMember(this);
        }
    }

    public void setDiary(Diary diary) {
        diaries.add(diary);
        if (diary.getMember() != this) {
            diary.setMember(this);
        }
    }

    public static Member createMember(String email, String name, String password) {
        return Member.builder()
                .email(email)
                .name(name)
                .password(password)
                .authority(Authority.ROLE_USER)
                .build();
    }
}