import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useSearchParams } from "react-router";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-100);

  @media ${DEVICE.sm} {
    gap: var(--spacing-50);
  }
`;

function TransactionsPagination({ pagesCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  function handlePageClick(newPage) {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  function handleDotButtonClick(index) {
    const newPage = index < currentPage ? currentPage - 1 : currentPage + 1;
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  function handleButtons(button) {
    const newPage = button === "next" ? currentPage + 1 : currentPage - 1;
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <>
      <Button
        $variation="pagination"
        $pagination={true}
        id={"prev"}
        value={"prev"}
        disabled={parseInt(currentPage) === 1}
        onClick={(e) => handleButtons("prev")}
      >
        <PiCaretLeftFill />
        {!mobileScreen && <span>Prev</span>}
      </Button>
      <Pages>
        {Array(pagesCount)
          .fill(true)
          .map((_, i) => {
            if (pagesCount <= 5) {
              return (
                <Button
                  key={i}
                  $variation="pagination"
                  $pagination={true}
                  $current={i + 1 === currentPage}
                  value={`${i + 1}`}
                  onClick={(e) => handlePageClick(e.target.value)}
                >
                  {`${i + 1}`}
                </Button>
              );
            } else if (
              i === 0 ||
              i === pagesCount - 1 ||
              i === currentPage - 1 ||
              (i <= 2 && currentPage <= 3) ||
              (i >= pagesCount - 3 && currentPage >= pagesCount - 2)
            ) {
              return (
                <Button
                  key={i}
                  $variation="pagination"
                  $pagination={true}
                  $current={i + 1 === currentPage}
                  value={`${i + 1}`}
                  onClick={(e) => handlePageClick(e.target.value)}
                >
                  {`${i + 1}`}
                </Button>
              );
            } else if (
              (currentPage <= 3 && i >= 4 && i < pagesCount - 1) ||
              (currentPage >= pagesCount - 2 && i < pagesCount - 4 && i > 0) ||
              (currentPage > 3 &&
                currentPage < pagesCount - 2 &&
                i < pagesCount - 2 &&
                i > 1)
            )
              return;
            else
              return (
                <Button
                  key={i}
                  $variation="pagination"
                  $pagination={true}
                  $current={i + 1 === currentPage}
                  value={`${i + 1}`}
                  onClick={() => handleDotButtonClick(i)}
                >
                  ...
                </Button>
              );
          })}
      </Pages>
      <Button
        $variation="pagination"
        $pagination={true}
        id={"next"}
        value={"next"}
        disabled={parseInt(currentPage) === pagesCount}
        onClick={() => handleButtons("next")}
      >
        {!mobileScreen && <span>Next</span>}
        <PiCaretRightFill />
      </Button>
    </>
  );
}

export default TransactionsPagination;
