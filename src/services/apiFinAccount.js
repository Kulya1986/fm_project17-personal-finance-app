import supabase from "./supabase";

export async function getFinanceInfo(userId) {
  // console.log(userId);
  if (!userId) return null;

  let { data: finance, error } = await supabase
    .from("profiles")
    .select("id, initial_balance, created_at, full_name")
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error("Finance info could not be loaded");
  }

  return { finance, error };
}
