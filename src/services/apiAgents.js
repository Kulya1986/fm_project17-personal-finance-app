import supabase from "./supabase";

export async function getAgents() {
  let { data: agents, error } = await supabase
    .from("agents")
    .select("id, full_name")
    .is("email", null);

  if (error) {
    console.error(error);
    throw new Error("Agents could not be loaded");
  }

  return { agents, error };
}

export async function getAllAgents() {
  let { data: agents, error } = await supabase
    .from("agents")
    .select("id, full_name");

  if (error) {
    console.error(error);
    throw new Error("Agents could not be loaded");
  }

  return { agents, error };
}
