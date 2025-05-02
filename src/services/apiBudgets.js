import { getBoundaryDate } from "../utils/helpers";
import supabase from "./supabase";

export async function getBudgets() {
  let { data: budgets, error } = await supabase
    .from("categories")
    .select("id, budgetLimit, theme, categoryName")
    .not("budgetLimit", "is", null);
  //   console.log(budgets);

  if (error) {
    console.error(error);
    throw new Error("Budgets could not be loaded");
  }

  return { budgets, error };
}
// NOT USED FOR NOW, NEED to CHANGE TABLE for FETCH to 'Categories'
export async function getBudgetsWithTransactions(year, month) {
  let query = supabase
    .from("budgets")
    .select(
      "id, budgetLimit, theme, categoryId, category:categories(categoryName), transactions!inner(categoryId, amount, income, created_at)"
    );

  if (year && month)
    query = query
      .gte("transactions.created_at", getBoundaryDate({ year, month }))
      .lte(
        "transactions.created_at",
        getBoundaryDate({ year, month, end: true })
      );
  else
    query = query
      .gte("transactions.created_at", getBoundaryDate({}))
      .lte("transactions.created_at", getBoundaryDate({ end: true }));

  let { data: budgets, error } = await query;
  //   console.log(budgets);

  if (error) {
    console.error(error);
    throw new Error("Budgets could not be loaded");
  }

  return { budgets, error };
}
