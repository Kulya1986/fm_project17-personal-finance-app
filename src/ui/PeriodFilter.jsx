import styled from "styled-components";
import { MONTHS } from "../utils/constants";
import Select from "./Select";
import { useState } from "react";
import { useSearchParams } from "react-router";

const StyledPeriodFilter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-200);
`;

const GroupLabel = styled.p`
  font-size: var(--text-preset-4);
  line-height: 1.5;
  font-weight: bold;
`;

function PeriodFilter() {
  const today = new Date();
  const years = [
    today.getFullYear(),
    today.getFullYear() - 1,
    today.getFullYear() - 2,
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const monthsArray = ["Select month"].concat(MONTHS);
  const monthId = searchParams.get("month");
  const year = searchParams.get("year");

  const selectedMonth =
    monthId && monthId !== "all" ? monthsArray[monthId] : monthsArray[0];
  const selectedYear = year ? year : today.getFullYear();

  function handleMonthChange(e) {
    if (e === monthsArray[0]) searchParams.set("month", "all");
    else searchParams.set("month", monthsArray.indexOf(e));
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handleYearChange(e) {
    searchParams.set("year", e);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <StyledPeriodFilter>
      <GroupLabel>Select period:</GroupLabel>
      <Select
        options={monthsArray}
        value={selectedMonth}
        onChange={handleMonthChange}
        selectwidth={"162px"}
      ></Select>
      <Select
        options={years}
        value={selectedYear}
        onChange={handleYearChange}
      ></Select>
    </StyledPeriodFilter>
  );
}

export default PeriodFilter;
