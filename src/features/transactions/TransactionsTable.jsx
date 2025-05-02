import { useState } from "react";
import { useCategories } from "../../hooks/useCatgeoris";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import TransactionRow from "./TransactionRow";
import { useTransactions } from "./useTransactions";
import TransactionsTableOperations from "./TransactionsTableOperations";
import TransactionsPagination from "./TransactionsPagination";
import { PAGE_SIZE } from "../../utils/constants";
import { useSearchParams } from "react-router";

function TransactionsTable() {
  const { isLoading, error, transactions, count } = useTransactions();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  console.log(transactions);
  const pagesCount = searchParams.get("searchedTransaction")
    ? Math.ceil(
        transactions.reduce(
          (acc, curr) => (curr.agents !== null ? acc + 1 : acc),
          0
        ) / PAGE_SIZE
      )
    : Math.ceil(count / PAGE_SIZE);
  // console.log(pagesCount);
  // console.log(categories);

  // setSelectedCategory(categoriesOptions[categoriesOptions.length - 1]);

  return (
    <Table
      columns={"1fr 7.5rem 7.5rem 12.5rem"}
      tablecolor={"var(--color-white)"}
      bordercolor={"var(--color-grey-100)"}
      spacing={{
        tablePadding: 400,
        tableGap: 300,
        columnsGap: 400,
        headerYPadding: 150,
        headerXPadding: 200,
        rowXPadding: 200,
        rowYPadding: 200,
      }}
    >
      <Table.Operations>
        <TransactionsTableOperations />
      </Table.Operations>
      <Table.Header>
        <div>Recipient / Sender</div>
        <div>Category</div>
        <div>Transaction date</div>
        <div style={{ textAlign: "right" }}>Amount</div>
      </Table.Header>
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
