import { useTransactionsForBudgets } from "../transactions/useTransactionsForBudgets";
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Chart from "../../ui/Chart";
import { prepareDataForChart } from "./prepareDataForChart";
import { useTransactionsByMonth } from "../transactions/useTransactionsByMonth";

const ChartContainer = styled.div`
  position: relative;
`;

function BudgetsSummaryChart({ budgets }) {
  const {
    isLoading,
    error,
    transactions: transactionsForMonth,
  } = useTransactionsByMonth({
    year: 2025,
    month: 4,
  });

  if (isLoading) return <Spinner />;

  const budgetsTransactions = budgets.map((budget) =>
    transactionsForMonth.filter((item) => item.categoryId === budget.id)
  );

  if (!budgetsTransactions) return;

  const { chartData, totalLimit, totalSpent } = prepareDataForChart(
    budgets,
    budgetsTransactions
  );

  return (
    <ChartContainer>
      {!chartData || !totalLimit || !totalSpent ? (
        <Spinner />
      ) : (
        <Chart
          legendOn={false}
          chartData={chartData}
          limit={totalLimit}
          spent={totalSpent}
        />
      )}
    </ChartContainer>
  );
}

export default BudgetsSummaryChart;
