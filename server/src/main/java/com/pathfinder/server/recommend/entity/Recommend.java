package com.pathfinder.server.recommend.entity;

import com.pathfinder.server.member.entity.Member;
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

//    @ManyToOne
//    @JoinColumn(name = "THREAD_ID")
//    private Thread thread;

    public void setMember(Member member) {
        this.member = member;
    }

//    public void setThread(Thread thread) {
//        this.thread = thread;
//    }
}
