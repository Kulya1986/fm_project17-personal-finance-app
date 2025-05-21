import styled from "styled-components";
import { useBudgets } from "./useBudgets";
import Spinner from "../../ui/Spinner";
import Card from "../../ui/Card";
import BudgetsSummaryChart from "./BudgetsSummaryChart";
import BudgetsSummaryTable from "./BudgetsSummaryTable";
import NoDataYet from "../../ui/NoDataYet";
import { DEVICE, SIZES } from "../../styles/screenBreakpoints";

const StyledBudgetSummary = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-300);
  min-width: 340px;
`;
function BudgetsSummary() {
  const { isLoading, error, budgets } = useBudgets();

  if (isLoading) return <Spinner />;

  if (!budgets.length) return <NoDataYet section={"budgets"} />;
  const tabScreen =
    window.screen.width <= SIZES.md && window.screen.width > SIZES.sm
      ? true
      : false;

  return (
    <StyledBudgetSummary>
      <Card
        $variation="budget"
        $mode="light"
        className={tabScreen ? "tab" : ""}
      >
        <BudgetsSummaryChart budgets={budgets} />
        <BudgetsSummaryTable budgets={budgets} />
      </Card>
    </StyledBudgetSummary>
  );
}

export default BudgetsSummary;
