import styled from "styled-components";

const TooltipCard = styled.div`
  border-radius: var(--spacing-100);
  background-color: rgba(248, 244, 240, 0.6);
  padding: var(--spacing-100) var(--spacing-250);
`;

const StyledText = styled.p`
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  line-height: 1.5;
`;
const BudgetSpent = styled(StyledText)`
  font-weight: bold;
`;

function CustomTooltip({ active, payload }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (active && payload && payload.length) {
    return (
      <TooltipCard>
        <StyledText>{`${payload[0].name}:`}</StyledText>
        <BudgetSpent>{`${USDollar.format(payload[0].value)}`}</BudgetSpent>
      </TooltipCard>
    );
  }
}

export default CustomTooltip;
