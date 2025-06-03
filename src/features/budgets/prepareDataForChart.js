import { SYSTEM_COLORS_WITH_CODES } from "../../utils/constants";

export function prepareDataForChart(budgets) {
  const chartData = budgets.map((item) => {
    return {
      budgetName: item.category_name,
      budgetColor: SYSTEM_COLORS_WITH_CODES.filter(
        (col) => col.color === item.budgets[0]?.theme
      )[0].code,
      budgetSpent: Math.abs(item.total_spent),
    };
  });

  const totalLimit = budgets.reduce(
    (acc, curr) => acc + curr?.budgets[0]?.budgetLimit,
    0
  );
  const totalSpent = budgets.reduce(
    (acc, curr) => acc + Math.abs(curr.total_spent),
    0
  );

  return { chartData, totalLimit, totalSpent };
}
