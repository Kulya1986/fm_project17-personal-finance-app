import styled from "styled-components";
import { useSearchParams } from "react-router";
import { useCategories } from "../hooks/useCatgeories";
import Select from "./Select";
import { SIZES } from "../styles/screenBreakpoints";

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

  const selectedCategory =
    !catId || catId === "all"
      ? "All Transactions"
      : categories.filter((item) => item.id === parseInt(catId))[0]
          .category_name;

  function handleCategoryChange(e) {
    const catId =
      e === "All Transactions"
        ? "all"
        : categories.filter((item) => item.category_name === e)[0].id;
    searchParams.set("category", catId);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const selectInitial = ["All Transactions"];
  const selectOptions = categories?.map((item) => item.category_name);
  const categoriesOptions = selectInitial.concat(selectOptions);
  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <StyledCategoryFilter>
      {!mobileScreen && <SelectLabel>Category</SelectLabel>}
      <Select
        options={categoriesOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        selectwidth={mobileScreen ? "20px" : "180px"}
        mobileImg={
          mobileScreen
            ? "https://rxdbotqqmsdjwbnfyykl.supabase.co/storage/v1/object/public/icons//icon-filter-mobile.svg"
            : ""
        }
      />
    </StyledCategoryFilter>
  );
}

export default CategoryFilter;
