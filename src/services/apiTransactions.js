import { PAGE_SIZE } from "../utils/constants";
import { getBoundaryDate } from "../utils/helpers";
import supabase from "./supabase";

export async function getTransactionsWithAgents(
  { search, filter, sortBy, page },
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
    // console.log(search);
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
    // if (sortBy.field === "amount") {
    //   query = query
    //     .order(sortBy.field, {
    //       ascending: sortBy.direction === "asc",
    //     })
    //     .order("income", { ascending: sortBy.direction === "asc" });
    // } else {
    query = query.order(
      !sortBy?.table ? sortBy.field : `${sortBy.table}(${sortBy.field})`,
      {
        ascending: sortBy.direction === "asc",
      }
    );
    // }
  } else {
    query = query.order("created_at", { ascending: false });
    //   .order("income", { ascending: true });
    // .order("created_at", {
    //   ascending: true,
    // });
  }

  // PAGINATION

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: transactions, error, count } = await query;
  //   console.log(transactions);
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

export async function getTransactionsByMonth({ year, month, limit }, userId) {
  if (!userId) return;
  let query = supabase
    .from("transactions")
    .select(
      "id, amount, created_at, income,  categoryId, agents(full_name, avatar)"
    )
    .eq("userId", userId);

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
  if (limit) query = query.range(0, limit - 1);

  let { data: transactions, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Transactions could not be loaded");
  }

  return { transactions, error };
}
