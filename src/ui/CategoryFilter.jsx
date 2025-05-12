import styled from "styled-components";
import { useSearchParams } from "react-router";
import { useCategories } from "../hooks/useCatgeoris";
import Select from "./Select";

const SelectLabel = styled.label`
  color: var(--color-grey-500);
  font-size: var(--text-preset-4);
  margin-right: var(--spacing-100);
`;

const StyledCategoryFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function CategoryFilter() {
  const { isLoading, error, categories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();
  const catId = searchParams.get("category");

  if (isLoading) return;

  console.log(categories);

  const selectedCategory =
    !catId || catId === "all"
      ? "All Transactions"
      : categories.filter((item) => item.id === parseInt(catId))[0]
          .categoryName;

  function handleCategoryChange(e) {
    const catId =
      e === "All Transactions"
        ? "all"
        : categories.filter((item) => item.categoryName === e)[0].id;
    searchParams.set("category", catId);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const selectInitial = ["All Transactions"];
  const selectOptions = categories.map((item) => item.categoryName);
  const categoriesOptions = selectInitial.concat(selectOptions);

  return (
    <StyledCategoryFilter>
      <SelectLabel>Category</SelectLabel>
      <Select
        options={categoriesOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
    </StyledCategoryFilter>
  );
}

export default CategoryFilter;
