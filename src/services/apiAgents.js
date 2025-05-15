import supabase from "./supabase";

export async function getAgents() {
  let { data: agents, error } = await supabase
    .from("agents")
    .select("id, fullName")
    .is("email", null);

  if (error) {
    console.error(error);
    throw new Error("Agents could not be loaded");
  }

  return { agents, error };
}
