import styled from "styled-components";
import Prev from "../../assets/images/prev.png";
import Next from "../../assets/images/next.png";

interface paginationProp {
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
}

const StyledPagination = styled.div`
  padding: 16px 0;
  display: flex;
  gap: 16px;
  justify-content: center;

  button {
    color: #444;
    font-size: 18px;
    border-bottom: 1px solid transparent;
    &:hover:not(:first-child, :last-child),
    &.active:not(:first-child, :last-child) {
      border-color: #444;
    }

    &.disabled {
      display: none;
    }
  }
`;

const Pagination = ({
  onPrevPage,
  onNextPage,
  currentPage,
  totalPages,
  onPageChange,
}: paginationProp) => {
  const firstVisiblePage = Math.max(currentPage - 2, 1);
  const lastVisiblePage = Math.min(firstVisiblePage + 4, totalPages);

  const visiblePageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <StyledPagination>
      <button onClick={onPrevPage} className={currentPage === 1 ? "disabled" : ""}>
        <img src={Prev} alt="이전 페이지" />
      </button>
      {visiblePageNumbers.map((pageNumber) => (
        <button
          className={currentPage === pageNumber ? "active" : ""}
          key={pageNumber}
          onClick={(event) => onPageChange(event, pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {totalPages > 0 && (
        <button onClick={onNextPage} className={currentPage === totalPages ? "disabled" : ""}>
          <img src={Next} alt="다음 페이지" />
        </button>
      )}
    </StyledPagination>
  );
};

export default Pagination;
