import styled from "styled-components";

import SearchField from "./SearchTransaction";
import SortBy from "./SortByTransaction";
import CategoryFilter from "../../ui/CategoryFilter";

const SelectsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-300);
`;

function TransactionsTableOperations() {
  return (
    <>
      <SearchField />
      <SelectsGroup>
        <SortBy />
        <CategoryFilter />
      </SelectsGroup>
    </>
  );
}

export default TransactionsTableOperations;
