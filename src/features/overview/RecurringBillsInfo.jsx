import { useNavigate } from "react-router";
import SpinnerMini from "../../ui/SpinnerMini";
import { addTypeFieldToRecurringBills } from "../recurringbills/addTypeToBills";
import { useRecurringBills } from "../recurringbills/useRecurringBills";
import Card from "../../ui/Card";
import Heading from "../../ui/Heading";
import ButtonArrow from "../../ui/ButtonArrow";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BillsInfoTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-150);
`;

const BillsInfoRow = styled.div`
  border-radius: var(--spacing-100);
  padding-left: 4px;
  background-color: ${(props) => props.$bordercolor};
`;

const InnerContent = styled.div`
  border-radius: 7px;
  padding: var(--spacing-250) var(--spacing-200);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-beige-100);
  font-size: var(--text-preset-4);
  line-height: 1.5;
  color: var(--color-grey-500);

  & p:last-child {
    font-weight: bold;
    color: var(--color-grey-900);
  }
`;

function RecurringBillsInfo() {
  const { isLoading, error, recurringBills } = useRecurringBills();
  const navigate = useNavigate();

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (isLoading) return <SpinnerMini />;

  const refactoredBills = addTypeFieldToRecurringBills(recurringBills);

  const paidBills = refactoredBills.reduce(
    (acc, bill) => (bill.type === "paid" ? acc + bill.amount : acc),
    0
  );

  const totalUpcomingBills = refactoredBills.reduce(
    (acc, bill) =>
      bill.type === "due" || bill.type === "upcoming" ? acc + bill.amount : acc,
    0
  );

  const dueSoonBills = refactoredBills.reduce(
    (acc, bill) => (bill.type === "due" ? acc + bill.amount : acc),
    0
  );

  return (
    <Card $variation="budget" $mode="light">
      <Header>
        <Heading as="h2">Recurring Bills</Heading>
        <ButtonArrow handleClick={() => navigate("/recurrings-bills")}>
          See Details
        </ButtonArrow>
      </Header>
      {recurringBills.length === 0 ? (
        <Heading as="h2">No data to display</Heading>
      ) : (
        <BillsInfoTable>
          <BillsInfoRow $bordercolor={"var(--color-green)"}>
            <InnerContent>
              <p>Paid Bills</p>
              <p>{USDollar.format(paidBills)}</p>
            </InnerContent>
          </BillsInfoRow>
          <BillsInfoRow $bordercolor={"var(--color-yellow)"}>
            <InnerContent>
              <p>Total Upcoming</p>
              <p>{USDollar.format(totalUpcomingBills)}</p>
            </InnerContent>
          </BillsInfoRow>
          <BillsInfoRow $bordercolor={"var(--color-cyan)"}>
            <InnerContent>
              <p>Due Soon</p>
              <p>{USDollar.format(dueSoonBills)}</p>
            </InnerContent>
          </BillsInfoRow>
        </BillsInfoTable>
      )}
    </Card>
  );
}

export default RecurringBillsInfo;
