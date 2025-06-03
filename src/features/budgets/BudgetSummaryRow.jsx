import styled from "styled-components";
// import { useTransactionsForBudgets } from "../transactions/useTransactionsForBudgets";

const GeneralCell = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTitle = styled(GeneralCell)`
  align-items: stretch;
`;

const StyledAmount = styled(GeneralCell)`
  align-items: center;
  justify-content: end;
`;

const StyledBorder = styled.div`
  margin-right: var(--spacing-200);
  width: 4px;
  border-radius: 8px;
  background-color: ${(props) => props.$boxcolor};
`;

const StyledName = styled.p`
  font-size: var(--text-preset-4);
  color: var(--color-grey-500);
  line-height: 1.5;
`;

const StyledSpent = styled.p`
  font-size: var(--text-preset-3);
  color: var(--color-grey-900);
  font-weight: bold;
  line-height: 1.5;
  margin-right: var(--spacing-100);
`;
const StyledTotal = styled.p`
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);
  line-height: 1.5;
`;

function BudgetSummaryRow({ budget }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const budgetColor = `var(--color-${budget.budgets[0].theme})`;

  return (
    <>
      <StyledTitle>
        <StyledBorder $boxcolor={budgetColor} />
        <StyledName>{budget.category_name}</StyledName>
      </StyledTitle>
      <StyledAmount>
        <StyledSpent>
          {USDollar.format(Math.abs(budget.total_spent))}
        </StyledSpent>
        <StyledTotal>{` of ${USDollar.format(
          budget.budgets[0].budgetLimit
        )}`}</StyledTotal>
      </StyledAmount>
    </>
  );
}

export default BudgetSummaryRow;
