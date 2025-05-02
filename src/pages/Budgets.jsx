import BudgetsSummary from "../features/budgets/BudgetsSummary";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import BudgetsTable from "../features/budgets/BudgetsTable";

const BudgetsHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BudgetsInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: var(--spacing-300);
`;

function Budgets() {
  return (
    <>
      <BudgetsHeading>
        <Heading as="h1">Budgets</Heading>
        <Button $variation={"primary"}>+ Add New Budget</Button>
      </BudgetsHeading>

      <BudgetsInfo>
        <BudgetsSummary />
        <BudgetsTable />
      </BudgetsInfo>
    </>
  );
}

export default Budgets;
