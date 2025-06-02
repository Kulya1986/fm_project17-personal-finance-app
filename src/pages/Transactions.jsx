import Heading from "../ui/Heading";
import TransactionsTable from "../features/transactions/TransactionsTable";
import styled from "styled-components";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import AddTransactionForm from "../features/transactions/AddTransactionForm";

const TransactionsHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

function Transactions() {
  return (
    <>
      <TransactionsHeading>
        <Heading as="h1">Transactions</Heading>
        <Modal>
          <Modal.Open opens={"add"}>
            <Button $variation={"primary"}>+ Add New Transaction</Button>
          </Modal.Open>
          <Modal.Window name={"add"} heading={"Add New Transaction"}>
            <AddTransactionForm />
          </Modal.Window>
        </Modal>
      </TransactionsHeading>

      <TransactionsTable />
    </>
  );
}

export default Transactions;
