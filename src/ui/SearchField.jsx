import { useSearchParams } from "react-router";
import Input from "./Input";
import { useState } from "react";

function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchedTransaction =
    searchParams.get("searchedTransaction") || "";

  const [searchedTransaction, setSearchedTransaction] = useState(
    currentSearchedTransaction
  );

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
      onChange={(e) => handleSearchedTransaction(e.target.value)}
      onKeyUp={(e) => handleSearch(e)}
      maxLength={"100"}
      value={searchedTransaction}
    />
    // </form>
  );
}

export default SearchField;
