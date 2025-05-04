import styled from "styled-components";
import Select from "../../ui/Select";
import { useSearchParams } from "react-router";

const sortByOptions = [
  {
    value: "frequency-desc",
    label: "Latest",
  },
  {
    // Type:paid, due, upcoming; Frequency:yearly,quarterly,monthly; dueDay: from 1 to highest
    value: "frequency-asc",
    label: "Oldest",
  },
  {
    value: "agentName-asc",
    label: "A to Z",
  },
  {
    value: "agentName-desc",
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

const SelectLabel = styled.span`
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  margin-right: var(--spacing-100);
`;

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOptions = sortByOptions.map((item) => item.label);
  const sortType = searchParams.get("sortByBills");

  const sortOption = sortType
    ? sortByOptions.filter((option) => option.value === sortType)[0].label
    : sortByOptions[0].label;

  function handleSortChange(label) {
    const option = sortByOptions.filter((opt) => opt.label === label)[0].value;

    searchParams.set("sortByBills", option);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <SelectLabel>Sort by</SelectLabel>
      <Select
        options={sortOptions}
        value={sortOption}
        onChange={handleSortChange}
        selectwidth={"114px"}
      />
    </div>
  );
}

export default SortBy;
