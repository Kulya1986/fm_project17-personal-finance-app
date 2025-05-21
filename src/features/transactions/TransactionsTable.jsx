import { useState } from "react";
import { useCategories } from "../../hooks/useCatgeories";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TransactionRow from "./TransactionRow";
import { useTransactions } from "./useTransactions";
import TransactionsTableOperations from "./TransactionsTableOperations";
import TransactionsPagination from "./TransactionsPagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useSearchParams } from "react-router";
import NoDataYet from "../../ui/NoDataYet";
import { SIZES } from "../../styles/screenBreakpoints";

function TransactionsTable() {
  const { isLoading, error, transactions, count } = useTransactions();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (count === 0) return <NoDataYet section={"transactions"} />;

  const pagesCount = searchParams.get("searchedTransaction")
    ? Math.ceil(
        transactions.reduce(
          (acc, curr) => (curr.agents !== null ? acc + 1 : acc),
          0
        ) / PAGE_SIZE
      )
    : Math.ceil(count / PAGE_SIZE);

  const deviceScreen = window.screen.width;

  // setSelectedCategory(categoriesOptions[categoriesOptions.length - 1]);

  return (
    <Table
      columns={
        deviceScreen <= SIZES.sm
          ? "1fr 7rem"
          : deviceScreen <= SIZES.md
          ? "1fr 5.5rem 5.5rem 6.5rem"
          : "1fr 7.5rem 7.5rem 12.5rem"
      }
      tablecolor={"var(--color-white)"}
      bordercolor={"var(--color-grey-100)"}
      spacing={{
        tablePadding: deviceScreen <= SIZES.sm ? 250 : 400,
        tableGap: 300,
        columnsGap: deviceScreen <= SIZES.sm ? 50 : 400,
        headerYPadding: 150,
        headerXPadding: deviceScreen <= SIZES.md ? 10 : 200,
        rowXPadding: deviceScreen <= SIZES.md ? 10 : 200,
        rowYPadding: 200,
      }}
    >
      <Table.Operations>
        <TransactionsTableOperations />
      </Table.Operations>
      {deviceScreen > SIZES.sm && (
        <Table.Header>
          <div>Recipient / Sender</div>
          <div>Category</div>
          <div>Transaction date</div>
          <div style={{ textAlign: "right" }}>Amount</div>
        </Table.Header>
      )}
      <Table.Body>
        {!transactions ? (
          <Table.Row>No transactions to display</Table.Row>
        ) : (
          transactions.map((item) => {
            if (item.agents !== null)
              return (
                <Table.Row key={item.id}>
                  <TransactionRow transaction={item} key={item.id} />
                </Table.Row>
              );
          })
        )}
      </Table.Body>
      <Table.Footer>
        <TransactionsPagination pagesCount={pagesCount} />
      </Table.Footer>
    </Table>
  );
}

export default TransactionsTable;
