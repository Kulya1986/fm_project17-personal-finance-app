import styled from "styled-components";
import Heading from "../ui/Heading";
import RecurringBillsSummary from "../features/recurringbills/RecurringBillsSummary";
import RecurringBillsTable from "../features/recurringbills/RecurringBillsTable";
import { useRecurringBills } from "../features/recurringbills/useRecurringBills";
import Spinner from "../ui/Spinner";
import { useSearchParams } from "react-router";
import {
  compareStrings,
  sortBillsByFrequencyDueDate,
  sortBillsByTypeAsc,
  sortBillsByTypeDesc,
} from "../utils/helpers";
import { addTypeFieldToRecurringBills } from "../features/recurringbills/addTypeToBills";
import NoDataYet from "../ui/NoDataYet";

const RecurringBillsInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: var(--spacing-300);

  & > div:last-child {
    flex-grow: 1;
  }
`;

function RecurringBills() {
  const { isLoading, error, recurringBills } = useRecurringBills();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // console.log(recurringBills);

  if (!recurringBills.length)
    return (
      <>
        <Heading as="h1">Recurring Bills</Heading>
        <NoDataYet section={"recurring bills"} />
      </>
    );

  const refactoredBills = addTypeFieldToRecurringBills(recurringBills);

  // 1. SEARCH FOR BILLS

  const searchValue = searchParams.get("searchedBill");
  const search = searchValue || null;
  const searchedBills = search
    ? refactoredBills.filter((bill) =>
        bill.agentName.toLowerCase().includes(search.toLowerCase())
      )
    : refactoredBills;

  //2. SORT BY BILLS

  const sortByValue = searchParams.get("sortByBills");
  const sortByValueComponents = sortByValue ? sortByValue.split("-") : null;

  const sortBy = sortByValueComponents
    ? {
        field: sortByValueComponents[0],
        direction: sortByValueComponents[1],
      }
    : null;

  const sortedBills = searchedBills.map((bill) => ({ ...bill }));
  if (sortBy) {
    if (sortBy?.field === "amount") {
      if (sortBy?.direction === "asc")
        sortedBills.sort((a, b) => a.amount - b.amount);
      else sortedBills.sort((a, b) => b.amount - a.amount);
    }
    if (sortBy?.field === "agentName") {
      if (sortBy?.direction === "asc")
        sortedBills.sort((a, b) =>
          compareStrings(a.agentName, b.agentName, true)
        );
      else
        sortedBills.sort((a, b) =>
          compareStrings(a.agentName, b.agentName, false)
        );
    }
    if (sortBy?.field === "frequency") {
      if (sortBy?.direction === "asc")
        sortedBills
          .sort((a, b) =>
            sortBillsByFrequencyDueDate(
              a.frequency,
              b.frequency,
              a.dueDay,
              b.dueDay,
              true
            )
          )
          .sort((a, b) => sortBillsByTypeAsc(a.type, b.type));
      else
        sortedBills
          .sort((a, b) =>
            sortBillsByFrequencyDueDate(
              a.frequency,
              b.frequency,
              a.dueDay,
              b.dueDay,
              false
            )
          )
          .sort((a, b) => sortBillsByTypeAsc(a.type, b.type));
    }
  }

  return (
    <>
      <Heading as="h1">Recurring Bills</Heading>

      <RecurringBillsInfo>
        <RecurringBillsSummary bills={refactoredBills} />
        <RecurringBillsTable bills={sortedBills} />
      </RecurringBillsInfo>
    </>
  );
}

export default RecurringBills;
