import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Chart from "../../ui/Chart";
import { prepareDataForChart } from "./prepareDataForChart";

const ChartContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;

function BudgetsSummaryChart({ budgets }) {
  const { chartData, totalLimit, totalSpent } = prepareDataForChart(budgets);

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
