import supabase from "./supabase";

export async function getCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("id, category_name");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return { categories, error };
}
