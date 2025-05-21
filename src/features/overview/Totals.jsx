import styled from "styled-components";
import Card from "../../ui/Card";
import { DEVICE } from "../../styles/screenBreakpoints";

const StyledTotals = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--spacing-300);

  @media ${DEVICE.sm} {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-150);
  }
`;

const Title = styled.p`
  font-size: var(--text-preset-4);
  line-height: 1.5;
  color: ${(props) =>
    props.$light ? "var(--color-grey-500)" : "var(--color-white)"};
`;

const Amount = styled.p`
  font-size: var(--text-preset-1);
  line-height: 1.2;
  font-weight: bold;
  /* color: var(--color-white); */
`;
function Totals({ currentBalance, expenses, income }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <StyledTotals>
      <Card $variation="total" $mode="dark">
        <Title>Current Balance</Title>
        <Amount>{USDollar.format(currentBalance)}</Amount>
      </Card>
      <Card $variation="total" $mode="light">
        <Title $light={true}>Income</Title>
        <Amount>{USDollar.format(income)}</Amount>
      </Card>
      <Card $variation="total" $mode="light">
        <Title $light={true}>Expenses</Title>
        <Amount>{USDollar.format(Math.abs(expenses))}</Amount>
      </Card>
    </StyledTotals>
  );
}

export default Totals;
