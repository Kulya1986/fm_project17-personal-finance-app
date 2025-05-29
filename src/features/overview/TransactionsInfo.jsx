import styled from "styled-components";
import Card from "../../ui/Card";
import Table from "../../ui/Table";
import Heading from "../../ui/Heading";
import ButtonArrow from "../../ui/ButtonArrow";
import { useNavigate } from "react-router";
import TransactionsInfoRow from "./TransactionsInfoRow";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function TransactionsInfo({ transactions }) {
  const navigate = useNavigate();
  return (
    <Card $variation="budget" $mode="light">
      <Header>
        <Heading as="h2">Transactions</Heading>
        <ButtonArrow handleClick={() => navigate("/transactions")}>
          See All
        </ButtonArrow>
      </Header>
      <Table
        columns={"1fr 6.25rem"}
        tablecolor={"var(--color-white)"}
        bordercolor={"var(--color-grey-100)"}
        borderradius={true}
        spacing={{
          tablePadding: 10,
          tableGap: 10,
          columnsGap: 100,
          headerYPadding: 10,
          headerXPadding: 10,
          rowXPadding: 10,
          rowYPadding: 250,
        }}
      >
        <Table.Body>
          {transactions.length === 0 ? (
            <Table.Row>
              <Heading as="h2">No transactions to display</Heading>
            </Table.Row>
          ) : (
            transactions.map((item) => (
              <Table.Row key={item.id}>
                <TransactionsInfoRow transaction={item} key={item.id} />
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Card>
  );
}

export default TransactionsInfo;
