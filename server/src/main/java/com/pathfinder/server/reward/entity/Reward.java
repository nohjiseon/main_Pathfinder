package com.pathfinder.server.reward.entity;

import com.pathfinder.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rewardId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int requirement;

    @Column(nullable = false)
    private String imageUrl;

    @Column
    private boolean unlocked;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
