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
    console.error(error);
    throw new Error("Recurring Bills could not be loaded");
  }

  return { recurringBills, error, count };
}

export async function addEditRecurringBill(newBill, id) {
  let query = supabase.from("recurringBills");
  if (!id) query = query.insert([newBill]);
  else query = query.update(newBill).eq("id", id);

  const { data: recurringBills, error } = await query;

  if (error) {
    console.error(error);
    if (!newBill.agentId) throw new Error("Select agent from the list");
    else if (!newBill.categoryId)
      throw new Error("Select category for the bill");
    else throw new Error("Recurring Bill could not be added");
  }

  return { recurringBills, error };
}

export async function deleteBill(id) {
  const { data, error } = await supabase
    .from("recurringBills")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Bill could not be deleted");
  }

  return { data };
}
