import { SYSTEM_COLORS_WITH_CODES } from "../../utils/constants";

export function prepareDataForChart(budgets, transactions) {
  const transactionsTotalPerBudget = transactions.map((item) =>
    item?.reduce((acc, trans) => acc + Math.abs(trans.amount), 0)
  );

  const chartData = budgets.map((item, i) => {
    return {
      budgetName: item.categories.category_name,
      budgetColor: SYSTEM_COLORS_WITH_CODES.filter(
        (col) => col.color === item.theme
      )[0].code,
      budgetSpent: transactionsTotalPerBudget[i],
    };
  });

  const totalLimit = budgets.reduce((acc, curr) => acc + curr.budgetLimit, 0);
  const totalSpent = transactionsTotalPerBudget.reduce(
    (acc, curr) => acc + curr,
    0
  );

  return { chartData, totalLimit, totalSpent };
}
