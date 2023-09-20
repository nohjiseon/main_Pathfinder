package com.pathfinder.server.recommend.repository;

import com.pathfinder.server.recommend.entity.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    Optional<Recommend> findByMemberMemberIdAndDiaryDiaryId(Long memberId, Long diaryId);
}
