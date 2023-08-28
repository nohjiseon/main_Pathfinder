package com.pathfinder.server.thread.entity;


import com.pathfinder.server.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Thread extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long threadId;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column
    private int recommendedCount;

    @Column
    private int views;

//    @OneToMany(mappedBy = "thread", cascade = CascadeType.ALL)
//    private List<Recommend> recommends = new ArrayList<>();
//    public void setRecommend(Recommend recommend) {
//        recommends.add(recommend);
//        if (recommend.getThread() != this) {
//            recommend.setThread(this);
//        }
//    }

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member;
}
