import { styled } from "styled-components";
import Card from "./common/Card";
import Pagination from "./common/Pagenation";
import { usePagination } from "../hooks/usePagination";
import { useEffect } from "react";
import { Tree } from "../assets/images/Tree";
import { useFetch } from "../hooks/useFetch";
import { areaState, diaryListState } from "../atoms/atoms";
import { Diary, DiaryData } from "../types/types";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Listbox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  > :last-child {
    align-items: center;
    justify-content: center;
  }
  section {
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(148, 148, 148, 0.148);
    border-radius: 10px;
  }
  .title {
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
  }
  ul {
    width: 1135px;
    height: 640px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .pagination {
    margin: 20px;
  }
`;
const List = () => {
  const {
    currentPage,
    totalPages,
    setTotalPages,
    onPageChangeHandler,
    onPrevPageHandler,
    onNextPageHandler,
  } = usePagination();
  const areaName = useRecoilValue<string | null>(areaState);
  const setArea = useSetRecoilState<string | null>(areaState);

  const url =
    !areaState || areaName === "전체 지역"
      ? `diary?page=${currentPage}`
      : `diary/area/${areaName}?page=${currentPage}`;
  const { fetchData, isLoading, isError, data } = useFetch<Diary>(diaryListState, url);
  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newArea = event.target.value;
    setArea(newArea);
    setTotalPages(data.pageInfo.totalPages);
  };
  const toggleList = () => {
    setArea(null);
  };
  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때와 areaName이 변경될 때 fetchData 호출
    setTotalPages(data.pageInfo.totalPages);
    fetchData();
  }, [areaName, currentPage]); // areaName 또는 currentPage가 변경될 때 fetchData 호출
  useEffect(() => {
    // areaName 또는 currentPage가 변경될 때만 totalPages 업데이트
    setTotalPages(data.pageInfo.totalPages);
  }, [areaName, data.pageInfo.totalPages]);
  if (isLoading) {
    return <Listbox>Loading...</Listbox>;
  }

  if (isError) {
    return <Listbox>Error...!</Listbox>;
  }
  return (
    <Listbox>
      <section className="modal">
        <h1 className="title">
          <div>
            <Tree />
            {areaName}{" "}
            <select value={areaName || ""} onChange={handleAreaChange}>
              <option value="전체 지역">전체 지역</option>
              <option value="경기도">경기도</option>
              <option value="강원도">강원도</option>
              <option value="충청도">충청도</option>
              <option value="전라도">전라도</option>
              <option value="경상도">경상도</option>
              <option value="제주도">제주도</option>
            </select>
          </div>
          <div className="close-button" onClick={toggleList}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M205.66 194.34C206.403 195.083 206.992 195.966 207.395 196.937C207.797 197.908 208.004 198.949 208.004 200C208.004 201.051 207.797 202.092 207.395 203.063C206.992 204.034 206.403 204.917 205.66 205.66C204.916 206.403 204.034 206.993 203.063 207.395C202.092 207.797 201.051 208.005 200 208.005C198.948 208.005 197.908 207.797 196.936 207.395C195.965 206.993 195.083 206.403 194.34 205.66L128 139.31L61.6596 205.66C60.1584 207.161 58.1225 208.005 55.9996 208.005C53.8767 208.005 51.8407 207.161 50.3396 205.66C48.8384 204.159 47.9951 202.123 47.9951 200C47.9951 197.877 48.8384 195.841 50.3396 194.34L116.69 128L50.3396 61.6601C48.8384 60.1589 47.9951 58.123 47.9951 56.0001C47.9951 53.8771 48.8384 51.8412 50.3396 50.3401C51.8407 48.8389 53.8767 47.9956 55.9996 47.9956C58.1225 47.9956 60.1584 48.8389 61.6596 50.3401L128 116.69L194.34 50.3401C195.841 48.8389 197.877 47.9956 200 47.9956C202.122 47.9956 204.158 48.8389 205.66 50.3401C207.161 51.8412 208.004 53.8771 208.004 56.0001C208.004 58.123 207.161 60.1589 205.66 61.6601L139.31 128L205.66 194.34Z"
                fill="black"
              />
            </svg>
          </div>
        </h1>
        <ul>{data?.data.map((el: DiaryData) => <Card key={el.diaryId} diaryData={el}></Card>)}</ul>
        <Pagination
          currentPage={currentPage}
          onPrevPage={onPrevPageHandler}
          totalPages={totalPages}
          onPageChange={onPageChangeHandler}
          onNextPage={onNextPageHandler}
        />
      </section>
    </Listbox>
  );
};

export default List;
