package com.pathfinder.server.scrap.repository;

import com.pathfinder.server.diary.entity.Diary;
import com.pathfinder.server.scrap.entity.Scrap;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    Optional<Scrap> findByMemberMemberIdAndDiaryDiaryId(Long memberId,Long diaryId);

    Page<Scrap> findByMemberMemberId(Long memberId, Pageable pageable);
}
