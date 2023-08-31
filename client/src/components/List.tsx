import { styled } from "styled-components";
import Card from "./common/Card";
import Pagination from "./common/Pagenation";
import { usePagination } from "../hooks/usePagination";
import { useEffect } from "react";

const Listbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);

  .title {
    width: 1135px;
    margin: 10px 0;
  }
  ul {
    width: 1135px;
    height: 640px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
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

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Listbox>
      <h1 className="title">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.7557 32.5734C42.3157 27.8089 49.0223 26.4356 54.7334 29.5045C60.4445 32.5734 62.2223 38.5945 59.6612 43.36L58.3345 41.9378C56.3223 39.8011 55.4179 39.3789 52.9479 37.7767C52.9479 37.7767 46.1768 32.7389 39.7557 32.5734Z"
            fill="#5C9E31"
          />
          <path
            d="M38.5722 31.3875C41.1722 30.4086 44.0722 31.2086 46.2645 33.2164C47.4766 34.3402 48.4076 35.7332 48.9822 37.283C50.7711 42.033 49.01 47.0908 45.0489 48.583C44.8111 42.3697 42.4934 36.213 38.5722 31.3875Z"
            fill="#B1CC33"
          />
          <path
            d="M17.1003 22.1759C19.0636 17.1359 25.5536 14.957 31.5959 17.3103C35.4236 18.8015 38.1548 21.7537 39.1425 24.9992C39.7136 26.8748 39.7025 28.8503 38.9825 30.697C38.9825 30.697 29.3981 21.2992 17.1003 22.1759Z"
            fill="#5C9E31"
          />
          <path
            d="M11.4415 38.7471C9.77599 32.4205 14.5749 25.6727 22.1593 23.676C23.3031 23.3739 24.4755 23.1925 25.6571 23.1349C31.9282 22.8349 37.5015 26.1682 38.9082 31.5149C29.3182 30.8949 19.4838 33.4849 11.4415 38.7471Z"
            fill="#B1CC33"
          />
          <path
            d="M66.3564 26.3823C66.3564 26.3823 52.4253 25.3279 40.4153 29.2968L39.5487 29.7879C39.5487 29.7879 37.0587 22.1779 43.2176 18.9746C48.3842 16.289 61.4331 13.9568 66.3564 26.3823Z"
            fill="#5C9E31"
          />
          <path
            d="M35.5812 36.0462C32.8845 43.6762 30.8289 54.7462 32.3145 69.7373M39.7556 31.4618C42.3156 26.6973 49.0223 25.324 54.7334 28.3929C60.4445 31.4618 63.0001 37.814 60.4389 42.5785C58.4173 40.4385 56.1467 38.5484 53.6756 36.9485M17.3001 21.1451C19.5934 16.2473 26.2134 14.5062 32.0856 17.2562C35.8067 18.9985 38.3334 22.1262 39.1034 25.4307C39.5478 27.3418 39.4056 29.3107 38.5645 31.1051"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M38.5722 31.3875C41.1722 30.4086 44.0722 31.2086 46.2645 33.2164C47.4766 34.3402 48.4076 35.7332 48.9822 37.283C50.7711 42.033 49.01 47.0908 45.0489 48.583C44.8111 42.3697 42.4934 36.213 38.5722 31.3875Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M42.0142 21.1217C42.1125 21.027 42.2122 20.9337 42.3131 20.8417C44.2864 19.0373 46.9353 17.5673 49.9598 16.8206C57.5731 14.9406 64.9642 18.9806 66.3564 25.3728C63.8053 25.0994 61.2353 25.0484 58.6753 25.2206M17.2987 21.1451L18.8887 21.0062M11.4409 38.7462C9.77533 32.4195 14.5742 25.6717 22.1587 23.6751C23.3025 23.3729 24.4748 23.1915 25.6564 23.1339C31.9276 22.8339 37.5009 26.1673 38.9076 31.5139C29.3176 30.8939 19.4831 33.4839 11.4409 38.7462Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
