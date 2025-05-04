import Table from "../../ui/Table";
import RecurringBillsRow from "./RecurringBillsRow";
import RecurringBillsTableOperations from "./RecurringBillsTableOperations";

function RecurringBillsTable({ bills }) {
  return (
    <Table
      columns={"1fr 8.5rem 6.25rem"}
      tablecolor={"var(--color-white)"}
      bordercolor={"var(--color-grey-100)"}
      spacing={{
        tablePadding: 400,
        tableGap: 300,
        columnsGap: 400,
        headerYPadding: 150,
        headerXPadding: 200,
        rowXPadding: 200,
        rowYPadding: 250,
      }}
    >
      <Table.Operations>
        <RecurringBillsTableOperations />
      </Table.Operations>
      <Table.Header>
        <div>Bill Title</div>
        <div>Due Date</div>
        <div style={{ textAlign: "right" }}>Amount</div>
      </Table.Header>
      <Table.Body>
        {!bills ? (
          <Table.Row>No transactions to display</Table.Row>
        ) : (
          bills.map((item) => {
            if (item.agents !== null)
              return (
                <Table.Row key={item.id}>
                  <RecurringBillsRow bill={item} key={item.id} />
                </Table.Row>
              );
          })
        )}
      </Table.Body>
    </Table>
  );
}

export default RecurringBillsTable;
