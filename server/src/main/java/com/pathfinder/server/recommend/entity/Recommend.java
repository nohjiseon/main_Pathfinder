package com.pathfinder.server.recommend.entity;

import com.pathfinder.server.member.entity.Member;
import com.pathfinder.server.diary.entity.Diary;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Recommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "DIARY_ID")
    private Diary diary;

    public void setMember(Member member) {
        this.member = member;
    }

    public void setDiary(Diary diary) {
        this.diary = diary;
    }
}
