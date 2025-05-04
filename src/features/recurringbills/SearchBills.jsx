import { useSearchParams } from "react-router";
import Input from "../../ui/Input";
import { useState } from "react";

function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearchedBill = searchParams.get("searchedBill") || "";

  const [searchedBill, setSearchedBill] = useState(currentSearchedBill);

  function handleSearch(e) {
    if (e.code === "Enter") {
      searchParams.set("searchedBill", searchedBill);
      if (searchParams.get("page")) searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }

  function handleSearchedBill(value) {
    setSearchedBill(value);
  }
  return (
    // <form onSubmit={handleSearch}>
    <Input
      placeholder="Search bills"
      $variation="iconSearch"
      onChange={(e) => handleSearchedBill(e.target.value)}
      onKeyUp={(e) => handleSearch(e)}
      maxLength={"100"}
      value={searchedBill}
    />
    // </form>
  );
}

export default SearchField;
