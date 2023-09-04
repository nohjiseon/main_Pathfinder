import { styled } from "styled-components";
import Card from "./common/Card";
import Pagination from "./common/Pagenation";
import { usePagination } from "../hooks/usePagination";
import { useEffect } from "react";
import { Tree } from "../assets/images/Tree";

const Listbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

  useEffect(() => {
    setTotalPages(10); // 총 페이지 몇개인지 임의로 정한거라 수정 필요함
  }, []);

  const data = [1, 2, 3, 4, 4, 4, 4, 4, 5, 3];
  return (
    <Listbox>
      <h1 className="title">
        <Tree />
        전체 게시물
      </h1>
      <ul>
        {data.map(() => (
          <Card></Card>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        onPrevPage={onPrevPageHandler}
        totalPages={totalPages}
        onPageChange={onPageChangeHandler}
        onNextPage={onNextPageHandler}
      />
    </Listbox>
  );
};

export default List;
