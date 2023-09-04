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

    @Query("SELECT d.recommendedCount FROM Diary d ORDER BY d.recommendedCount DESC")
    List<Diary> findByTop3ByOrderedByRecommendedCountDesc();
}
