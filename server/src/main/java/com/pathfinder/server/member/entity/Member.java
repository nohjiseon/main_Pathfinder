package com.pathfinder.server.member.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "MEMBERS")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(length = 30, nullable = false)
    private String name;

    @Column(length = 30, updatable = false)
    private String email;

    @Column(length = 100)
    private String password;

//    @Column(nullable = false)
//    private String profileImageUrl = "http://localhost:8080/images/sample.jpg";

//    @ElementCollection(fetch = FetchType.EAGER) // 인가
//    private List<String> roles = new ArrayList<>();

}