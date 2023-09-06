package com.pathfinder.server.diary.repository;

import com.pathfinder.server.diary.entity.Diary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Page<Diary> findByArea1(String area1, Pageable pageable);
    Page<Diary> findByMemberMemberId(Long memberId, Pageable pageable);

    @Query("SELECT d FROM Diary d ORDER BY d.recommendedCount")
    Page<Diary> findByTop3ByOrderedByRecommendedCount(Pageable pageable);
}
