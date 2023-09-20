import { atom } from "recoil";
import { Diary, DiaryData, DiaryDetail } from "../types/types";

export const diaryListState = atom<Diary>({
  key: "diaryListState",
  default: {
    data: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
  },
});

export const diaryMyListState = atom<Diary>({
  key: "diaryMyListState",
  default: {
    data: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
  },
});

export const diaryMyScrapListState = atom<Diary>({
  key: "diaryMyScrapListState",
  default: {
    data: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
  },
});
export const diaryDetailState = atom<DiaryDetail>({
  key: "diaryDetailState",
  default: {
    data: {
      diaryId: 0,
      createdAt: "",
      modifiedAt: "",
      email: "",
      area1: "",
      area2: "",
      name: "",
      title: "",
      content: "",
      recommendedCount: 0,
      views: 0,
      scrap: false,
      scrapCount: 0,
      recommend: false,
    },
  },
});
export const diaryState = atom<DiaryData>({
  key: "diaryState",
  default: {
    diaryId: 0,
    createdAt: "",
    modifiedAt: "",
    email: "",
    area1: "",
    area2: "",
    name: "",
    title: "",
    content: "",
    recommendedCount: 0,
    views: 0,
    scrap: false,
    scrapCount: 0,
    recommend: false,
  },
});

export const consentModalState = atom<boolean>({
  key: "consentModalState",
  default: false,
});

export const teamModalState = atom<boolean>({
  key: "teamModalState",
  default: false,
});

export const areaState = atom<string | null>({
  key: "areaState",
  default: null,
});
