package com.pathfinder.server.diary.repository;

import com.pathfinder.server.diary.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Page<Diary> findByArea1(String area1, Pageable pageable);
    Page<Diary> findByMemberMemberId(Long memberId, Pageable pageable);
}
