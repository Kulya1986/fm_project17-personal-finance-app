import { getBoundaryDate } from "../utils/helpers";
import supabase from "./supabase";

export async function getBudgets(userId) {
  if (!userId) return;
  let { data: budgets, error } = await supabase
    .from("budgets")
    .select(
      "id, budgetLimit, theme, categoryId, categories(category_name), userId"
    )
    .eq("userId", userId);
  // .not("budgetLimit", "is", null);
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
      "id, budgetLimit, theme, categoryId, category:categories(category_name), transactions!inner(categoryId, amount, income, created_at)"
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

export async function addEditBudget(newBudget, id) {
  console.log(newBudget, id);
  //1. Create budget

  let query = supabase.from("budgets");

  //1.A). Create budget
  if (!id) query = query.insert([newBudget]);

  //1.B). Edit existing budget
  if (id) query = query.update(newBudget).eq("id", id);

  const { data: budgets, error } = await query;

  if (error) {
    console.error(error);
    // if (!id) throw new Error("Select budget category");
    // else
    throw new Error("Budget could not be created");
  }

  return { budgets, error };
}

export async function deleteBudget(id) {
  const { data, error } = await supabase.from("budgets").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Budget could not be deleted");
  }

  return { data };
}
