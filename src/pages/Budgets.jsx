import BudgetsSummary from "../features/budgets/BudgetsSummary";
import styled from "styled-components";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import BudgetsTable from "../features/budgets/BudgetsTable";
import AddBudgetForm from "../features/budgets/AddBudgetForm";
import Modal from "../ui/Modal";
import { DEVICE } from "../styles/screenBreakpoints";

const BudgetsHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BudgetsInfo = styled.div`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--spacing-300);

  & section:only-child {
    grid-column: 1 / span 2;
  }

  @media ${DEVICE.md} {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
`;

function Budgets() {
  return (
    <>
      <BudgetsHeading>
        <Heading as="h1">Budgets</Heading>
        <Modal>
          <Modal.Open opens={"add"}>
            <Button $variation={"primary"}>+ Add New Budget</Button>
          </Modal.Open>
          <Modal.Window name={"add"} heading={"Add New Budget"}>
            <AddBudgetForm />
          </Modal.Window>
        </Modal>
      </BudgetsHeading>

      <BudgetsInfo>
        <BudgetsSummary />
        <BudgetsTable />
      </BudgetsInfo>
    </>
  );
}

export default Budgets;
