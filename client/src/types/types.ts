
export interface Diary {
  data: DiaryData[];
  pageInfo: PageInfo;
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
  recommendCount: number;
  views: number;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
