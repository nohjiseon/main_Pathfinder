package com.pathfinder.server.reward.mapper;

import com.pathfinder.server.reward.dto.RewardDto;
import com.pathfinder.server.reward.entity.Reward;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RewardMapper {
    RewardDto.Response rewardToRewardResponse(Reward reward);
    List<RewardDto.Response> RewardsToRewardResponseDtos(List<Reward> rewards);
}
