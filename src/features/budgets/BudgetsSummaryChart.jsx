import Spinner from "../../ui/Spinner";
import { useTransactionsForBudgets } from "../transactions/useTransactionsForBudgets";
import { useBudgets } from "./useBudgets";

function BudgetsSummaryChart() {
  const { isLoading, error, budgets } = useBudgets();

  if (isLoading) return <Spinner />;

  const budgetsTransactions = budgets.map((budget) =>
    useTransactionsForBudgets({
      year: 2025,
      month: 4,
      categoryId: budget.id,
    })
  );

  if (!budgetsTransactions) return;

  const transactionsTotalPerBudget = budgetsTransactions.map((item) =>
    item.transactions?.reduce((acc, trans) => acc + Math.abs(trans.amount), 0)
  );

  console.log(budgetsTransactions);
  console.log(transactionsTotalPerBudget);
  return <div>Chart</div>;
}

export default BudgetsSummaryChart;
