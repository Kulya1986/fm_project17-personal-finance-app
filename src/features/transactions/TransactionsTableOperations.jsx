import { useState } from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useSearchParams } from "react-router";
import SearchField from "../../ui/SearchField";
import SortBy from "../../ui/SortBy";
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
