import styled from "styled-components";
import Card from "../../ui/Card";
import Heading from "../../ui/Heading";
import Table from "../../ui/Table";
import { PiReceipt } from "react-icons/pi";

const StyledRecurringBillsSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-300);
  width: 340px;
`;

const StyledCell = styled.div`
  font-size: var(--text-preset-5);
  line-height: 1.5;
  font-weight: normal;

  &:first-child {
    color: var(--color-grey-500);
  }

  &:last-child {
    color: var(--color-grey-900);
    font-weight: bold;
    text-align: right;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;

  & svg {
    width: 100%;
    height: 100%;
    color: var(--color-white);
  }
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: var(--color-white);
  gap: 11px;

  & p:first-child {
    font-size: var(--text-preset-4);
    line-height: 1.5;
  }

  & p:last-child {
    font-size: var(--text-preset-1);
    line-height: 1.2;
    font-weight: bold;
  }
`;

function RecurringBillsSummary({ bills }) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const billsTotal = bills.reduce(
    (acc, bill) => acc + Math.abs(bill.amount),
    0
  );
  const paidBills = bills.reduce(
    (acc, bill) =>
      bill.type === "paid"
        ? { ...acc, count: acc.count + 1, amount: acc.amount + bill.amount }
        : acc,
    { count: 0, amount: 0 }
  );

  const totalUpcomingBills = bills.reduce(
    (acc, bill) =>
      bill.type === "due" || bill.type === "upcoming"
        ? { ...acc, count: acc.count + 1, amount: acc.amount + bill.amount }
        : acc,
    { count: 0, amount: 0 }
  );

  const dueSoonBills = bills.reduce(
    (acc, bill) =>
      bill.type === "due"
        ? { ...acc, count: acc.count + 1, amount: acc.amount + bill.amount }
        : acc,
    { count: 0, amount: 0 }
  );

  return (
    <StyledRecurringBillsSummary>
      <Card
        $variation="pot"
        style={{ backgroundColor: "var(--color-grey-900)" }}
      >
        <Icon>
          <PiReceipt />
        </Icon>
        <Total>
          <p>Total Bills</p>
          <p>{`${USDollar.format(billsTotal)}`}</p>
        </Total>
      </Card>
      <Table
        columns={"1fr 1fr"}
        tablecolor={"var(--color-white)"}
        bordercolor={"var(--color-grey-100)"}
        spacing={{
          tablePadding: 250,
          tableGap: 250,
          columnsGap: 10,
          rowXPadding: 10,
          rowYPadding: 200,
        }}
      >
        <Heading as="h3" style={{ color: "var(--color-grey-900)" }}>
          Summary
        </Heading>
        <Table.Body>
          <Table.Row>
            <StyledCell>Paid Bills</StyledCell>
            <StyledCell>{`${paidBills.count} (${USDollar.format(
              paidBills.amount
            )})`}</StyledCell>
          </Table.Row>
          <Table.Row>
            <StyledCell>Total Upcoming</StyledCell>
            <StyledCell>{`${totalUpcomingBills.count} (${USDollar.format(
              totalUpcomingBills.amount
            )})`}</StyledCell>
          </Table.Row>
          <Table.Row>
            <StyledCell style={{ color: "var(--color-red)" }}>
              Due Soon
            </StyledCell>
            <StyledCell style={{ color: "var(--color-red)" }}>{`${
              dueSoonBills.count
            } (${USDollar.format(dueSoonBills.amount)})`}</StyledCell>
          </Table.Row>
        </Table.Body>
      </Table>
    </StyledRecurringBillsSummary>
  );
}

export default RecurringBillsSummary;
