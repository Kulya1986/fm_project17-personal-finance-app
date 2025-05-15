import supabase from "./supabase";

export async function getRecurringBillsWithAgents() {
  let query = supabase
    .from("recurringBills")
    .select(
      "id, frequency, created_at, amount, dueDay, categoryId, agentId, categories(categoryName), agents(fullName, avatar)",
      { count: "exact" }
    )
    .order("dueDay", { ascending: true });

  const { data: recurringBills, error, count } = await query;

  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Recurring Bills could not be loaded");
  }

  return { recurringBills, error, count };
}

export async function addRecurringBill(newBill) {
  const { data: recurringBills, error } = await supabase
    .from("recurringBills")
    .insert([newBill]);

  if (error) {
    //   console.log(data);
    console.error(error);
    throw new Error("Recurring Bill could not be added");
  }

  return { recurringBills, error };
}
