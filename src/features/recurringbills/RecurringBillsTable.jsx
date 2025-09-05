import { SIZES } from "../../styles/screenBreakpoints";
import Table from "../../ui/Table";
import RecurringBillsRow from "./RecurringBillsRow";
import RecurringBillsTableOperations from "./RecurringBillsTableOperations";

function RecurringBillsTable({ bills }) {
  const deviceScreen =
    window.innerWidth < window.screen.width
      ? window.innerWidth
      : window.screen.width;
  return (
    <Table
      columns={deviceScreen <= SIZES.sm ? "1fr" : "1fr 8.5rem 4.5rem 1rem"}
      tablecolor={"var(--color-white)"}
      bordercolor={"var(--color-grey-100)"}
      spacing={{
        tablePadding: deviceScreen <= SIZES.sm ? 250 : 400,
        tableGap: 300,
        columnsGap: deviceScreen <= SIZES.sm ? 100 : 400,
        headerYPadding: 150,
        headerXPadding: deviceScreen <= SIZES.sm ? 10 : 200,
        rowXPadding: deviceScreen <= SIZES.sm ? 10 : 200,
        rowYPadding: 250,
      }}
    >
      <Table.Operations>
        <RecurringBillsTableOperations />
      </Table.Operations>
      {deviceScreen > SIZES.sm && (
        <Table.Header>
          <div>Bill Title</div>
          <div>Due Date</div>
          <div style={{ textAlign: "right" }}>Amount</div>
          <div></div>
        </Table.Header>
      )}
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
