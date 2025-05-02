import { PAGE_SIZE } from "../utils/constants";
import { getBoundaryDate } from "../utils/helpers";
import supabase from "./supabase";

export async function getRecurringBillsWithAgents({
  search,
  sortBy,
  // page
}) {
  let query = supabase
    .from("recurringBills")
    .select(
      "id, frequency, created_at, amount, dueDay, categoryId, agentId, categories(categoryName), agents(fullName, avatar)",
      { count: "exact" }
    );

  //SEARCH BY AGENT

  if (search) {
    // console.log(search);
    query = query.textSearch("agents.fullName", search, {
      type: "plain",
      config: "english",
    });
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
    query = query.order("dueDay", { ascending: true });
    //   .order("income", { ascending: true });
    // .order("created_at", {
    //   ascending: true,
    // });
  }

  // PAGINATION

  // if (page) {
  //   const from = (page - 1) * PAGE_SIZE;
  //   const to = from + PAGE_SIZE - 1;
  //   query = query.range(from, to);
  // }

  const { data: recurringBills, error, count } = await query;
  //   console.log(transactions);
  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Recurring Bills could not be loaded");
  }

  return { recurringBills, error, count };
}
