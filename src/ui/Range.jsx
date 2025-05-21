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

  & *:last-child {
    text-align: right;
  }
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

const SubArea = styled.div`
  border-right: 1px solid var(--color-beige-100);
  background-color: var(--color-grey-900);
  width: ${(props) => props.$rangewidth};
  height: var(--spacing-100);
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
  border-top-right-radius: ${(props) =>
    props.$rangewidth === "100.00%" ? "inherit" : "unset"};
  border-bottom-right-radius: ${(props) =>
    props.$rangewidth === "100.00%" ? "inherit" : "unset"};
`;

const BarBlank = styled.div`
  width: ${(props) => props.$rangewidth};
`;

const StyledLegend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RangeContext = createContext(null);

function Range({ rangeColor, completeness, section, subarea = 0, children }) {
  return (
    <RangeContext.Provider
      value={{
        rangeColor,
        completeness,
        subarea,
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
  const { rangeColor, completeness, section, subarea } =
    useContext(RangeContext);

  return (
    <StyledBar $section={section}>
      <BarColored $color={rangeColor} $rangewidth={`${completeness}%`}>
        {subarea > 0 && <SubArea $rangewidth={`${subarea}%`}></SubArea>}
      </BarColored>
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
