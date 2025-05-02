import supabase from "./supabase";

export async function getPots() {
  let { data: pots, error } = await supabase
    .from("pots")
    .select("id, title,targetAmount, potAmount,  theme");
  //   console.log(budgets);

  if (error) {
    console.error(error);
    throw new Error("Pots could not be loaded");
  }

  return { pots, error };
}
