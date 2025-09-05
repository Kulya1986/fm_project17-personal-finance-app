import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Card from "../../ui/Card";
import BudgetsSummaryChart from "./BudgetsSummaryChart";
import BudgetsSummaryTable from "./BudgetsSummaryTable";
import NoDataYet from "../../ui/NoDataYet";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";
import { useTotalSumByCategoryForMonth } from "../transactions/useTotalSumByCategoryForMonth";

const StyledBudgetSummary = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-300);
  min-width: 340px;
`;
function BudgetsSummary() {
  const { isLoading, error, transactionsTotalPerBudget } =
    useTotalSumByCategoryForMonth();

  if (isLoading) return <Spinner />;

  const existingBudgets = transactionsTotalPerBudget.filter(
    (item) => item.category_name
  );

  const tabScreen =
    (window.screen.width <= SIZES.md || window.innerWidth <= SIZES.md) &&
    (window.screen.width > SIZES.sm || window.innerWidth > SIZES.sm)
      ? true
      : false;

  return (
    <StyledBudgetSummary>
      <Card
        $variation="budget"
        $mode="light"
        className={tabScreen ? "tab" : ""}
      >
        {transactionsTotalPerBudget.length === 0 ? (
          <NoDataYet section={"spending per budget"} />
        ) : (
          <>
            <BudgetsSummaryChart budgets={existingBudgets} />
            <BudgetsSummaryTable budgets={existingBudgets} />
          </>
        )}
      </Card>
      {/* )} */}
    </StyledBudgetSummary>
  );
}

export default BudgetsSummary;
