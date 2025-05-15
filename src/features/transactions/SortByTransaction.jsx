import styled from "styled-components";
import Select from "../../ui/Select";
import { useSearchParams } from "react-router";

const sortByOptions = [
  {
    value: "created_at-desc",
    label: "Latest",
  },
  {
    value: "created_at-asc",
    label: "Oldest",
  },
  {
    value: "agents-fullName-asc",
    label: "A to Z",
  },
  {
    value: "agents-fullName-desc",
    label: "Z to A",
  },
  {
    value: "amount-desc",
    label: "Highest",
  },
  {
    value: "amount-asc",
    label: "Lowest",
  },
];

const SelectLabel = styled.label`
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  margin-right: var(--spacing-100);
`;

const StyledSortBy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOptions = sortByOptions.map((item) => item.label);
  const sortType = searchParams.get("sortBy");

  const sortOption = sortType
    ? sortByOptions.filter((option) => option.value === sortType)[0].label
    : sortByOptions[0].label;

  function handleSortChange(label) {
    const option = sortByOptions.filter((opt) => opt.label === label)[0].value;

    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  }

  return (
    <StyledSortBy>
      <SelectLabel>Sort by</SelectLabel>
      <Select
        options={sortOptions}
        value={sortOption}
        onChange={handleSortChange}
        selectwidth="125px"
      />
    </StyledSortBy>
  );
}

export default SortBy;
