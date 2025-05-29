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

import Menus from "../../ui/Menus";
import AddBudgetForm from "./AddBudgetForm";
import { useDeleteBudget } from "./useDeleteBudget";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { SIZES } from "../../styles/screenBreakpoints";

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
  const { budgetLimit, theme, id, categories, categoryId } = budget;
  const budgetTitle = categories.category_name;
  const { isLoading, error, transactions } = useTransactionsForBudgets({
    year: 2025,
    month: 4,
    categoryId: categoryId,
  });
  const navigate = useNavigate();
  const { removeBudget, isDeleting } = useDeleteBudget();

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

  const mobileScreen = window.screen.width <= SIZES.sm ? true : false;

  return (
    <Card $variation="budget" $mode="light">
      <CardTitle>
        <CardHeading
          color={budgetColor}
          title={budgetTitle}
          section={"budget"}
        />
        <Menus>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens={"edit"}>
                  <Menus.Item>Edit budget</Menus.Item>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Item $isDelete={true}>Delete budget</Menus.Item>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={"edit"} heading={"Edit Budget"}>
                <AddBudgetForm budgetToEdit={budget} />
              </Modal.Window>
              <Modal.Window
                heading={`Delete '${budgetTitle}'?`}
                name={"delete"}
              >
                <ConfirmDelete
                  section={"budget"}
                  disabled={isDeleting}
                  onConfirm={() => removeBudget(id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </Menus>
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
          tablePadding: mobileScreen ? 200 : 250,
          tableGap: 250,
          columnsGap: mobileScreen ? 10 : 50,
          rowXPadding: 10,
          rowYPadding: mobileScreen ? 150 : 200,
        }}
      >
        <StyledHeader>
          <Heading as="h3">Latest Spending</Heading>
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
