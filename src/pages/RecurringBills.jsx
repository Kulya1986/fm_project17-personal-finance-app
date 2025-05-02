import styled from "styled-components";
import Heading from "../ui/Heading";
import RecurringBillsSummary from "../features/recurringbills/RecurringBillsSummary";
import RecurringBillsTable from "../features/recurringbills/RecurringBillsTable";
import { useRecurringBills } from "../features/recurringbills/useRecurringBills";
import Spinner from "../ui/Spinner";

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

  if (isLoading) return <Spinner />;
  console.log(recurringBills);

  return (
    <>
      <Heading as="h1">Recurring Bills</Heading>

      <RecurringBillsInfo>
        <RecurringBillsSummary bills={recurringBills} />
        <RecurringBillsTable bills={recurringBills} />
      </RecurringBillsInfo>
    </>
  );
}

export default RecurringBills;
