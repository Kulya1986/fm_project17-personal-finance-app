import styled from "styled-components";
import Totals from "./Totals";
import PotsInfo from "./PotsInfo";
import BudgetsInfo from "./BudgetsInfo";
import RecurringBillsInfo from "./RecurringBillsInfo";
import TransactionsInfo from "./TransactionsInfo";
import Spinner from "../../ui/Spinner";
import { useTransactions } from "../transactions/useTransactions";
import { useFinAccount } from "./useFinAccount";
import { DEVICE } from "../../styles/screenBreakpoints";
import { useTransactionsTotal } from "../transactions/useTransactionsTotal";

const StyledSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
`;

const SummaryPerSection = styled.div`
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: var(--spacing-300);

  @media ${DEVICE.md} {
    display: flex;
    flex-direction: column;
  }

  @media ${DEVICE.sm} {
    gap: var(--spacing-200);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-300);
`;

function SummaryInfo() {
  const { isLoading, error, transactions } = useTransactions();
  const { isLoading: isLoading1, error: error1, finance } = useFinAccount();
  const {
    isLoading: isLoading2,
    error: error2,
    transactionsTotal,
  } = useTransactionsTotal();

  if (isLoading || isLoading1 || isLoading2) return <Spinner />;

  const currentBalance =
    finance[0]?.initial_balance + transactionsTotal[0]?.sum;
  const income = transactions.reduce(
    (acc, curr) => (curr.income ? acc + curr.amount : acc),
    0
  );
  const expenses = transactions.reduce(
    (acc, curr) => (!curr.income ? acc + curr.amount : acc),
    0
  );

  return (
    <StyledSummaryInfo>
      <Totals
        currentBalance={currentBalance}
        income={income}
        expenses={expenses}
      />
      <SummaryPerSection>
        <Column>
          <PotsInfo />
          <TransactionsInfo transactions={transactions.slice(0, 5)} />
        </Column>
        <Column>
          <BudgetsInfo />
          <RecurringBillsInfo />
        </Column>
      </SummaryPerSection>
    </StyledSummaryInfo>
  );
}

export default SummaryInfo;
