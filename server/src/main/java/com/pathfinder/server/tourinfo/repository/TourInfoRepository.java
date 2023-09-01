package com.pathfinder.server.tourinfo.repository;

import com.pathfinder.server.tourinfo.entity.TourInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourInfoRepository extends JpaRepository<TourInfo, Long> {
}
