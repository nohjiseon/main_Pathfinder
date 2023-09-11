package com.pathfinder.server.reward.repository;

import com.pathfinder.server.reward.entity.Reward;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    Page<Reward> findByMemberMemberId(Long memberId, Pageable pageable);
}
