package com.pathfinder.server.diary.mapper;

import com.pathfinder.server.diary.dto.DiaryDto;
import com.pathfinder.server.diary.entity.Diary;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DiaryMapper {
    Diary diaryPostDtoToDiary(DiaryDto.Post diaryPostDto);
    Diary diaryPatchDtoToDiary(DiaryDto.Patch diaryPatchDto);
    DiaryDto.Response DiaryToDiaryResponseDto(Diary diary);
    List<DiaryDto.Response> DiariesToDiaryResponseDtos(List<Diary> diaries);
}
