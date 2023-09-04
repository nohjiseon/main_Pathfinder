import { atom } from "recoil";
import { Diary, DiaryData } from "../types/types";

export const diaryListState = atom<Diary>({
  key: "diaryListState",
  default: {
    data: [],
    pageInfo: { page: 1, size: 10, totalElements: 0, totalPages: 1 },
  },
});

export const diaryState = atom<DiaryData>({
  key: "diaryState",
  default: {
    diaryId: 0,
    createdAt: "",
    modifiedAt: "",
    area1: "",
    area2: "",
    name: "",
    title: "",
    content: "",
    recommendCount: 0,
    views: 0,
  },
});

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});
