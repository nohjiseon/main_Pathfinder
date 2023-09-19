import styled from "styled-components";
import { usePagination } from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";
import { Diary, DiaryData } from "../types/types";
import { diaryMyScrapListState } from "../atoms/atoms";
import Pagination from "./common/Pagenation";
import { useEffect } from "react";
import Card from "./common/Card";

const MyPageBlogList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30px;
  gap: 12px 16px;

  .MyPageEmpty {
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
  }
`;

const MyPagePaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Scrap = () => {
  const memberId = localStorage.getItem("memberId");

  const {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  } = usePagination();
  const url = `/scrap/${memberId}?page=${currentPage}`;
  const { fetchData, data } = useFetch<Diary>(diaryMyScrapListState, url);
  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때와 fetchData 호출
    setTotalPages(data.pageInfo.totalPages);
    fetchData();
  }, [currentPage]); // currentPage가 변경될 때 fetchData 호출
  return (
    <>
      <MyPageBlogList>
        {data.data.length !== 0 ? (
          data.data.map((el: DiaryData) => <Card key={el.diaryId} diaryData={el}></Card>)
        ) : (
          <div className="MyPageEmpty">스크랩한 글이 없습니다.</div>
        )}
      </MyPageBlogList>
      <MyPagePaginationContainer>
        <Pagination
          currentPage={currentPage}
          onPrevPage={onPrevPageHandler}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
          onNextPage={onNextPageHandler}
        />
      </MyPagePaginationContainer>
    </>
  );
};
export default Scrap;
