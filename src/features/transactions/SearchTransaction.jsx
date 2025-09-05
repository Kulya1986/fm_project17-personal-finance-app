import { useSearchParams } from "react-router";
import Input from "../../ui/Input";
import { useState } from "react";
import { SIZES } from "../../styles/screenBreakpoints";

function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchedTransaction =
    searchParams.get("searchedTransaction") || "";

  const [searchedTransaction, setSearchedTransaction] = useState(
    currentSearchedTransaction
  );

  const tabWidth =
    window.screen.width <= SIZES.sm || window.innerWidth <= SIZES.sm
      ? "70%"
      : window.screen.width <= SIZES.md || window.innerWidth <= SIZES.md
      ? "160px"
      : false;

  function handleSearch(e) {
    if (e.code === "Enter") {
      searchParams.set("searchedTransaction", searchedTransaction);
      if (searchParams.get("page")) searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }

  function handleSearchedTransaction(value) {
    setSearchedTransaction(value);
  }
  return (
    // <form onSubmit={handleSearch}>
    <Input
      placeholder="Search transaction"
      $variation="iconSearch"
      $tabWidth={tabWidth}
      onChange={(e) => handleSearchedTransaction(e.target.value)}
      onKeyUp={(e) => handleSearch(e)}
      maxLength={"100"}
      value={searchedTransaction}
    />
    // </form>
  );
}

export default SearchField;
