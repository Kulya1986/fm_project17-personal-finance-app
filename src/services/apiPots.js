import { FaBullseye } from "react-icons/fa";
import supabase from "./supabase";

export async function getPots(userId) {
  if (!userId) return;
  let { data: pots, error } = await supabase
    .from("pots")
    .select("id, title,targetAmount, potAmount,  theme, userId")
    .eq("userId", userId)
    .order("potAmount", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Pots could not be loaded");
  }

  return { pots, error };
}

export async function addEditPot(newPot, id) {
  //1. Create pot

  let query = supabase.from("pots");

  //1.A). Create pot
  if (!id) query = query.insert([newPot]);

  //1.B). Edit existing pot
  if (id) query = query.update(newPot).eq("id", id);

  const { data: pots, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Pot could not be created");
  }

  return { pots, error };
}

export async function deletePot(id) {
  const { data, error } = await supabase.from("pots").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Pot could not be deleted");
  }

  return { data };
}
