import { PiCaretLeftFill, PiCaretRightFill } from "react-icons/pi";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useSearchParams } from "react-router";
import { SIZES } from "../../styles/screenBreakpoints";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-100);
`;

function TransactionsPagination({ pagesCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  function handlePageClick(newPage) {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  }

  function handleButtons(button) {
    // console.log(button);
    const newPage =
      button === "Next" ? parseInt(currentPage) + 1 : parseInt(currentPage) - 1;
    // console.log(newPage);
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
        onClick={(e) => handleButtons(e.target.innerText)}
      >
        <PiCaretLeftFill />
        {!mobileScreen && <span>Prev</span>}
      </Button>
      <Pages>
        {Array(pagesCount)
          .fill(true)
          .map((_, i) => (
            <Button
              key={i}
              $variation="pagination"
              $pagination={true}
              $current={i + 1 === parseInt(currentPage)}
              value={`${i + 1}`}
              onClick={(e) => handlePageClick(e.target.value)}
            >
              {`${i + 1}`}
            </Button>
          ))}
      </Pages>
      <Button
        $variation="pagination"
        $pagination={true}
        id={"next"}
        value={"next"}
        disabled={parseInt(currentPage) === pagesCount}
        onClick={(e) => handleButtons(e.target.innerText)}
      >
        {!mobileScreen && <span>Next</span>}
        <PiCaretRightFill />
      </Button>
    </>
  );
}

export default TransactionsPagination;
