package com.pathfinder.server.thread.repository;

import com.pathfinder.server.thread.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
}
