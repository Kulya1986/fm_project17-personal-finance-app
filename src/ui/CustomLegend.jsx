import styled from "styled-components";
import CopyWithColorBar from "./CopyWithColorBar";

const StyledLegendItem = styled.li`
  margin-bottom: var(--spacing-200);
`;

function CustomLegend({ payload }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const legendLength = payload.length / 2;

  return (
    <ul>
      {payload.map(
        (item, i) =>
          i < legendLength && (
            <StyledLegendItem key={item.payload.budgetName}>
              <CopyWithColorBar rectColor={item.payload.budgetColor}>
                <p>{item.payload.budgetName}</p>
                <p>{USDollar.format(item.payload.budgetSpent)}</p>
              </CopyWithColorBar>
            </StyledLegendItem>
          )
      )}
    </ul>
  );
}

export default CustomLegend;
