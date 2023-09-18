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

export interface RandomData {
  title: string;
  addr1: string;
  addr2: string;
  tel: string;
  firstimage: string;
  firstimage2: string;
  tag: string;
  zipcode: string;
}
