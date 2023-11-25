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
  email: string;
  area1: string;
  area2: string;
  name: string;
  title: string;
  content: string;
  recommendedCount: number;
  scrap: boolean;
  scrapCount: number;
  views: number;
  recommend: boolean;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface RandomData {
  contentId: number;
  title: string;
  addr1: string;
  addr2: string;
  firstimage: string;
}
