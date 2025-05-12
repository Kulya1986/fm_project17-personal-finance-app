import styled from "styled-components";
import Card from "../../ui/Card";
import CardHeading from "../../ui/CardHeading";
import Range from "../../ui/Range";
import SpinnerMini from "../../ui/SpinnerMini";
import { useTransactionsForBudgets } from "../transactions/useTransactionsForBudgets";
import Table from "../../ui/Table";
import ButtonArrow from "../../ui/ButtonArrow";
import BudgetTransactionRow from "./BudgetTransactionRow";
import Heading from "../../ui/Heading";
import { useNavigate } from "react-router";
import CopyWithColorBar from "../../ui/CopyWithColorBar";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const CardTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & svg {
    color: var(--color-grey-300);
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function Budget({ budget }) {
  const { budgetLimit, theme, id, categoryName: budgetTitle } = budget;
  const { isLoading, error, transactions } = useTransactionsForBudgets({
    year: 2025,
    month: 4,
    categoryId: id,
  });
  const navigate = useNavigate();

  if (isLoading) return <SpinnerMini />;
  //   console.log("Budget transactions:", transactions);

  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const limitedTransactions = transactions.slice(0, 3);
  const budgetColor = `var(--color-${theme})`;
  const totalSpending = transactions.reduce(
    (acc, curr) => acc + Math.abs(curr.amount),
    0
  );
  const budgetCompleteness =
    totalSpending >= budgetLimit
      ? 100
      : ((totalSpending / budgetLimit) * 100).toFixed(2);

  return (
    <Card $variation="budget" $mode="light">
      <CardTitle>
        <CardHeading
          color={budgetColor}
          title={budgetTitle}
          section={"budget"}
        />
        <Modal>
          <Modal.Open opens={"delete"}>
            <Button $variation="context">
              <PiDotsThreeOutlineFill />
            </Button>
          </Modal.Open>
          {/* <Modal.Window heading={`Delete '${title}'?`} name={"delete"}>
            <ConfirmDelete
              section={"budget"}
              disabled={isDeleting}
              onConfirm={() => removeBudget(id)}
            />
          </Modal.Window> */}
        </Modal>
      </CardTitle>
      <Range
        rangeColor={budgetColor}
        completeness={budgetCompleteness}
        section="budgets"
      >
        <Range.Heading>
          <p>{`Maximum of ${USDollar.format(budgetLimit)}`}</p>
        </Range.Heading>
        <Range.Bar />
        <Range.Legend>
          <CopyWithColorBar rectColor={budgetColor}>
            <p>Spent</p>
            <p>{USDollar.format(totalSpending)}</p>
          </CopyWithColorBar>
          <CopyWithColorBar rectColor={"var(--color-beige-100)"}>
            <p>Remaining</p>
            <p>
              {USDollar.format(
                budgetLimit - totalSpending > 0
                  ? budgetLimit - totalSpending
                  : 0
              )}
            </p>
          </CopyWithColorBar>
        </Range.Legend>
      </Range>
      <Table
        columns={"1fr 1fr"}
        tablecolor={"var(--color-beige-100)"}
        bordercolor={"var(--color-grey-300)"}
        spacing={{
          tablePadding: 250,
          tableGap: 250,
          columnsGap: 50,
          rowXPadding: 10,
          rowYPadding: 200,
        }}
      >
        <StyledHeader>
          <Heading as="h3" style={{ color: "var(--color-grey-900)" }}>
            Latest Spending
          </Heading>
          <ButtonArrow
            handleClick={() => navigate(`/transactions?category=${id}`)}
          >
            See All
          </ButtonArrow>
        </StyledHeader>
        <Table.Body>
          {!transactions ? (
            <Table.Row>No transactions to display</Table.Row>
          ) : (
            limitedTransactions.map((item) => (
              <Table.Row key={item.id}>
                <BudgetTransactionRow transaction={item} key={item.id} />
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Card>
  );
}

export default Budget;
