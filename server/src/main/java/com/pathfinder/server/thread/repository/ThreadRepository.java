package com.pathfinder.server.thread.repository;

import com.pathfinder.server.thread.entity.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ThreadRepository extends JpaRepository<Thread, Long> {
    Page<Thread> findByArea1(String area1, Pageable pageable);
    Page<Thread> findByMemberMemberId(Long memberId, Pageable pageable);
}
