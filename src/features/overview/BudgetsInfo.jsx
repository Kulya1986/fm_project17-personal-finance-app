import styled from "styled-components";
import { useNavigate } from "react-router";
import { useBudgets } from "../budgets/useBudgets";
import { prepareDataForChart } from "../budgets/prepareDataForChart";
import Chart from "../../ui/Chart";
import ButtonArrow from "../../ui/ButtonArrow";
import Spinner from "../../ui/Spinner";
import Card from "../../ui/Card";
import Heading from "../../ui/Heading";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ChartContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* & h2 {
    text-align: center;
  } */
`;

function BudgetsInfo({ transactionsForMonth }) {
  const { isLoading, error, budgets } = useBudgets();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const budgetsTransactions = budgets.map((budget) =>
    transactionsForMonth.filter(
      (item) => item.categoryId === budget.id && !item.income
    )
  );

  if (!budgetsTransactions) return;

  const { chartData, totalLimit, totalSpent } = prepareDataForChart(
    budgets,
    budgetsTransactions
  );

  return (
    <Card $variation="budget" $mode="light">
      <Header>
        <Heading as="h2">Budgets</Heading>
        <ButtonArrow handleClick={() => navigate("/budgets")}>
          See Details
        </ButtonArrow>
      </Header>
      <ChartContainer>
        {!chartData || !totalLimit || !totalSpent ? (
          // <Spinner />
          <Heading as="h2">No data to display</Heading>
        ) : (
          <Chart
            legendOn={true}
            chartData={chartData}
            limit={totalLimit}
            spent={totalSpent}
          />
        )}
      </ChartContainer>
    </Card>
  );
}

export default BudgetsInfo;
