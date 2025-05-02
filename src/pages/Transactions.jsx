import Heading from "../ui/Heading";
import TransactionsTable from "../features/transactions/TransactionsTable";
function Transactions() {
  return (
    <>
      <Heading as="h1">Transactions</Heading>
      <TransactionsTable />
    </>
  );
}

export default Transactions;
