import styled from "styled-components";
import SearchField from "./SearchBills";
import SortBy from "./SortByBills";

const SelectsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-300);
`;
function RecurringBillsTableOperations() {
  return (
    <>
      <SearchField />
      <SortBy />
    </>
  );
}

export default RecurringBillsTableOperations;
