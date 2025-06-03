import { PAGE_SIZE } from "../utils/constants";
import { getBoundaryDate } from "../utils/helpers";
import supabase from "./supabase";

export async function getTotalSumForTransactions(userId) {
  if (!userId) return;

  let query = supabase
    .from("transactions")
    .select("amount.sum()")
    .eq("userId", userId);

  const { data: transactionsTotal, error } = await query;

  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactionsTotal, error };
}

// Used on OVERVIEW and TRANSACTIONS pages
export async function getTransactionsWithAgents(
  { search, filter, sortBy, page, month, year },
  userId
) {
  if (!userId) return;

  let query = supabase
    .from("transactions")
    .select(
      "id, amount, created_at, income, categoryId, agentId, categories(category_name), agents(full_name, avatar)",
      { count: "exact" }
    )
    .eq("userId", userId);

  //SEARCH BY AGENT

  if (search) {
    query = query.textSearch("agents.full_name", search, {
      type: "plain",
      config: "english",
    });
  }

  //FILTER (Filter by category)

  if (filter?.field) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  //SORT (Latest-desc, Oldest-asc, AtoZ - asc, ZtoA -desc, Highest -desc , Lowest-asc)

  if (sortBy?.field) {
    query = query.order(
      !sortBy?.table ? sortBy.field : `${sortBy.table}(${sortBy.field})`,
      {
        ascending: sortBy.direction === "asc",
      }
    );
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if (year && month) {
    // Select transactions for specified period(month)
    query = query
      .gte("created_at", getBoundaryDate({ year, month }))
      .lte("created_at", getBoundaryDate({ year, month, end: true }));
  }

  // PAGINATION

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: transactions, error, count } = await query;

  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactions, error, count };
}

export async function getTransactionsByCategory(categoryId, num, userId) {
  if (!userId) return;
  let query = supabase
    .from("transactions")
    .select(
      "id, amount, created_at, income,  categoryId, agents(full_name, avatar)"
    )
    .eq("categoryId", categoryId)
    .eq("userId", userId)
    .order("created_at");

  if (num) query = query.range(0, num - 1);

  let { data: transactionsByCategory, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactionsByCategory, error };
}

// Used for list of transactions within CURRENT or SELECTED month for each budget. On BUDGET page
export async function getTransactionsForBudgets(
  {
    year,
    month,
    categoryId,
    //   num,
  },
  userId
) {
  if (!userId) return;
  let query = supabase
    .from("transactions")
    .select(
      "id, amount, created_at, income,  categoryId, agents(full_name, avatar)"
    )
    .eq("userId", userId)
    .eq("income", false);

  if (categoryId) query = query.eq("categoryId", categoryId);

  if (year && month) {
    // Select transactions for specified period(month)
    query = query
      .gte("created_at", getBoundaryDate({ year, month }))
      .lte("created_at", getBoundaryDate({ year, month, end: true }));
  }
  // Select transactions for current month
  else
    query = query
      .gte("created_at", getBoundaryDate({}))
      .lte("created_at", getBoundaryDate({ end: true }));

  query = query.order("created_at", {
    ascending: false,
  });

  //Limit returned number of transactions
  //   if (num) query = query.range(0, num - 1);

  let { data: transactions, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactions, error };
}

export async function getTotalSumByCategoryForMonth({ month, year }, userId) {
  if (!userId) return;

  let query = supabase
    .from("transactions")
    .select(
      "categoryId, ...categories(category_name, budgets!inner(userId, categoryId, theme, budgetLimit)), total_spent:amount.sum(), userId"
    )
    .eq("income", false)
    .eq("userId", userId)
    .eq("categories.budgets.userId", userId);

  if (year && month) {
    // Select transactions for specified period(month)
    query = query
      .gte("created_at", getBoundaryDate({ year, month }))
      .lte("created_at", getBoundaryDate({ year, month, end: true }));
  }
  // Select transactions for current month
  else
    query = query
      .gte("created_at", getBoundaryDate({}))
      .lte("created_at", getBoundaryDate({ end: true }));

  const { data: transactionsTotalPerBudget, error } = await query;

  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactionsTotalPerBudget, error };
}

export async function addEditTransaction(newTransaction, id) {
  let query = supabase.from("transactions");
  if (!id) query = query.insert([newTransaction]);
  else query = query.update(newTransaction).eq("id", id);

  const { data: transactions, error } = await query;

  if (error) {
    console.error(error);
    if (!newTransaction.agentId) throw new Error("Select agent from the list");
    else if (!newTransaction.categoryId)
      throw new Error("Select category for the bill");
    else throw new Error("Recurring Bill could not be added");
  }

  return { transactions, error };
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Transaction could not be deleted");
  }

  return { data };
}
