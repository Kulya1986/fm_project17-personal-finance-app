import styled from "styled-components";
import Select from "../../ui/Select";
import { useSearchParams } from "react-router";
import { SIZES } from "../../styles/screenBreakpoints";

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

  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <StyledSortBy>
      {!mobileScreen && <SelectLabel>Sort by</SelectLabel>}
      <Select
        options={sortOptions}
        value={sortOption}
        onChange={handleSortChange}
        $selectwidth={mobileScreen ? "20px" : "125px"}
        mobileImg={
          mobileScreen
            ? "https://rxdbotqqmsdjwbnfyykl.supabase.co/storage/v1/object/public/icons//icon-sort-mobile.svg"
            : ""
        }
      />
    </StyledSortBy>
  );
}

export default SortBy;
