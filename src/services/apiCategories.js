import supabase from "./supabase";

export async function getCategories() {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("id, categoryName");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return { categories, error };
}
