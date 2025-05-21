import styled from "styled-components";
import CopyWithColorBar from "./CopyWithColorBar";
import { DEVICE } from "../styles/screenBreakpoints";

const StyledCustomLegend = styled.ul`
  display: grid;
  gap: var(--spacing-200);
  grid-template-columns: 1fr;

  @media ${DEVICE.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

function CustomLegend({ payload }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const legendLength = payload.length / 2 < 5 ? payload.length / 2 : 4;

  return (
    <StyledCustomLegend>
      {payload.map(
        (item, i) =>
          i < legendLength && (
            <li key={item.payload.budgetName}>
              <CopyWithColorBar rectColor={item.payload.budgetColor}>
                <p>{item.payload.budgetName}</p>
                <p>{USDollar.format(item.payload.budgetSpent)}</p>
              </CopyWithColorBar>
            </li>
          )
      )}
    </StyledCustomLegend>
  );
}

export default CustomLegend;
