import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const sections = {
  pots: css`
    height: var(--spacing-100);
  `,
  budgets: css`
    padding: var(--spacing-50);
    height: var(--spacing-400);
  `,
};

const StyledRange = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-200);
`;

const StyledHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  line-height: 1.5;
`;

const StyledBar = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  background-color: var(--color-beige-100);

  ${(props) => sections[props.$section]}
`;

const BarColored = styled.div`
  border-radius: inherit;
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$rangewidth};
`;

const BarBlank = styled.div`
  width: ${(props) => props.$rangewidth};
`;

const StyledLegend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const RangeContext = createContext(null);

function Range({ rangeColor, completeness, section, children }) {
  return (
    <RangeContext.Provider
      value={{
        rangeColor,
        completeness,
        section,
      }}
    >
      <StyledRange>{children}</StyledRange>
    </RangeContext.Provider>
  );
}

function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}
function Bar() {
  const { rangeColor, completeness, section } = useContext(RangeContext);

  return (
    <StyledBar $section={section}>
      <BarColored
        $color={rangeColor}
        $rangewidth={`${completeness}%`}
      ></BarColored>
      <BarBlank $rangewidth={`${100.0 - completeness}%`}></BarBlank>
    </StyledBar>
  );
}
function Legend({ children }) {
  return <StyledLegend>{children}</StyledLegend>;
}

Range.Heading = Heading;
Range.Bar = Bar;
Range.Legend = Legend;

export default Range;
