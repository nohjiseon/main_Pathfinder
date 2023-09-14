export interface Diary {
  data: DiaryData[];
  pageInfo: PageInfo;
}
export interface DiaryDetail {
  data: DiaryData;
}
export interface DiaryData {
  diaryId: number;
  createdAt: string;
  modifiedAt: string;
  area1: string;
  area2: string;
  name: string;
  title: string;
  content: string;
  recommendedCount: number;
  views: number;
  recommend: boolean;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
