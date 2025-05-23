import styled from "styled-components";
import { useBudgets } from "./useBudgets";
import Spinner from "../../ui/Spinner";
import Budget from "./Budget";
import NoDataYet from "../../ui/NoDataYet";

const StyledBudgetsTable = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-300);
`;

function BudgetsTable() {
  const { isLoading, error, budgets } = useBudgets();
  if (isLoading) return <Spinner />;

  // console.log(budgets);
  if (!budgets.length) return <NoDataYet section={"budgets"} />;

  return (
    <StyledBudgetsTable>
      {budgets.map((budget) => (
        <Budget budget={budget} key={budget.id} />
      ))}
    </StyledBudgetsTable>
  );
}

export default BudgetsTable;
