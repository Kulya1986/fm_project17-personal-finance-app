import supabase from "./supabase";

export async function getFinanceInfo() {
  let { data: finance, error } = await supabase
    .from("financeAccount")
    .select("id, initialBalance, created_at");
  //   console.log(budgets);

  if (error) {
    console.error(error);
    throw new Error("Finance info could not be loaded");
  }

  return { finance, error };
}
