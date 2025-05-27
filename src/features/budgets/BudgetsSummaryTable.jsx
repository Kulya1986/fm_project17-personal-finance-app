import styled from "styled-components";
import Heading from "../../ui/Heading";
import Table from "../../ui/Table";
import BudgetSummaryRow from "./BudgetSummaryRow";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function BudgetsSummaryTable({ budgets }) {
  return (
    <>
      <Table
        columns={"1fr 1.5fr"}
        tablecolor={"var(--color-white)"}
        bordercolor={"var(--color-grey-100)"}
        borderradius={true}
        spacing={{
          tableGap: 300,
          columnsGap: 10,
          rowXPadding: 10,
          rowYPadding: 200,
        }}
      >
        <StyledHeader>
          <Heading as="h2">Spending Summary</Heading>
        </StyledHeader>
        <Table.Body>
          {!budgets ? (
            <Table.Row>No budgets to display</Table.Row>
          ) : (
            budgets.map((budget) => (
              <Table.Row key={budget.id}>
                <BudgetSummaryRow budget={budget} key={budget.id} />
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </>
  );
}

export default BudgetsSummaryTable;
