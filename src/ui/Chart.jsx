import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";
import styled from "styled-components";

const ChartTotals = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-100);
  align-items: center;
  /* Position in the center of bounded area of box with dynamic dimensions */
  position: absolute;
  top: ${(props) => (props.$legend ? "calc(50% + 10px)" : "50%")};
  left: ${(props) => (props.$legend ? "calc(50% - 50px)" : "50%")};

  transform: translate(-50%, -50%);
`;

const TotalSpent = styled.p`
  font-size: var(--text-preset-1);
  font-weight: bold;
  color: var(--color-grey-900);
  line-height: 1.2;
`;

const TotalLimit = styled.p`
  font-size: var(--text-preset-5);
  color: var(--color-grey-500);
  line-height: 1.5;
`;

function Chart({ legendOn = false, chartData, limit, spent }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={94}
            outerRadius={120}
            dataKey="budgetSpent"
            nameKey="budgetName"
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.budgetName}
                fill={entry.budgetColor}
                stroke={entry.budgetColor}
              />
            ))}
          </Pie>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={78}
            outerRadius={94}
            dataKey="budgetSpent"
            nameKey="budgetName"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.budgetName}
                fill={`${entry.budgetColor}75`}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {legendOn && (
            <Legend
              align="right"
              layout="vertical"
              iconType="rect"
              content={<CustomLegend />}
              // iconSize={4}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
      <ChartTotals $legend={legendOn}>
        <TotalSpent>{`$${Math.floor(spent)}`}</TotalSpent>
        <TotalLimit>{`of ${Math.floor(limit)} limit`}</TotalLimit>
      </ChartTotals>
    </>
  );
}

export default Chart;
