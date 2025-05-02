import styled from "styled-components";
import { useBudgets } from "./useBudgets";
import Spinner from "../../ui/Spinner";
import Card from "../../ui/Card";
import BudgetsSummaryChart from "./BudgetsSummaryChart";
import BudgetsSummaryTable from "./BudgetsSummaryTable";

const StyledBudgetSummary = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-300);
  width: 428px;
`;
function BudgetsSummary() {
  const { isLoading, error, budgets } = useBudgets();

  if (isLoading) return <Spinner />;

  return (
    <StyledBudgetSummary>
      <Card $variation="budget">
        <BudgetsSummaryChart budgets={budgets} />
        <BudgetsSummaryTable budgets={budgets} />
      </Card>
    </StyledBudgetSummary>
  );
}

export default BudgetsSummary;
