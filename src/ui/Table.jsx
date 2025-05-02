import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  background-color: ${(props) => props.$tablecolor};
  border-radius: 12px;
  padding: ${(props) => props.$tablepadding};
  font-size: var(--text-preset-4);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$tablegap};
`;

const StyledOperations = styled.div`
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GeneralRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  align-items: center;
  gap: ${(props) => props.$columnsgap};
`;

const StyledHeader = styled(GeneralRow)`
  /* margin-bottom: var(--spacing-100); */
  text-transform: capitalize;
  border-bottom: solid 1px ${(props) => props.$bordercolor};
  padding: ${(props) => props.$headerpadding};

  line-height: 1.5;
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);
`;
const StyledRow = styled(GeneralRow)`
  /* margin-bottom: var(--spacing-100); */
  border-top: solid 1px ${(props) => props.$bordercolor};
  padding: ${(props) => props.$rowpadding};
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);
  line-height: 1.5;

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

// const StyledBody = styled.div`
//   margin: var(--spacing-200) 0;
// `;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-300);
`;

const TableContext = createContext(null);

// spacing={tablePadding: 400, tableGap:400, columnsGap:400, headerYPadding:150, headerXPadding:200, rowPadding:200}

function Table({ columns, tablecolor, bordercolor, spacing, children }) {
  const tablePadding = spacing.tablePadding
    ? `var(--spacing-${spacing.tablePadding})`
    : 0;
  const tableGap = spacing.tableGap ? `var(--spacing-${spacing.tableGap})` : 0;
  const columnsGap = spacing.columnsGap
    ? `var(--spacing-${spacing.columnsGap})`
    : 0;
  const headerPadding =
    spacing.headerYPadding && spacing.headerXPadding
      ? `var(--spacing-${spacing.headerYPadding}) var(--spacing-${spacing.headerXPadding})`
      : 0;
  const rowPadding =
    spacing.rowYPadding && spacing.rowXPadding
      ? `var(--spacing-${spacing.rowYPadding}) var(--spacing-${spacing.rowXPadding})`
      : 0;
  return (
    <TableContext.Provider
      value={{
        columns,
        tablecolor,
        bordercolor,
        tablePadding,
        tableGap,
        columnsGap,
        headerPadding,
        rowPadding,
      }}
    >
      <StyledTable
        role="table"
        $tablecolor={tablecolor}
        $tablegap={tableGap}
        $tablepadding={tablePadding}
      >
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Operations({ children }) {
  return <StyledOperations>{children}</StyledOperations>;
}
function Header({ children }) {
  const { columns, columnsGap, headerPadding, bordercolor } =
    useContext(TableContext);

  return (
    <StyledHeader
      role="row"
      $columns={columns}
      $bordercolor={bordercolor}
      $columnsgap={columnsGap}
      $headerpadding={headerPadding}
    >
      {children}
    </StyledHeader>
  );
}
function Body({ children }) {
  return <div>{children}</div>;
}
function Row({ children }) {
  const { columns, columnsGap, rowPadding, bordercolor } =
    useContext(TableContext);
  return (
    <StyledRow
      role="row"
      $bordercolor={bordercolor}
      $columns={columns}
      $columnsgap={columnsGap}
      $rowpadding={rowPadding}
    >
      {children}
    </StyledRow>
  );
}
function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}

Table.Operations = Operations;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
