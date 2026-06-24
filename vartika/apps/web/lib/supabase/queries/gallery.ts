import { createClient } from "../client";

export async function getActiveGalleryImages() {
  const supabase = createClient();
  return supabase
    .from("gallery")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}

export async function insertGalleryImage(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("gallery").insert(data).select().single();
}

export async function deleteGalleryImage(id: string) {
  const supabase = createClient();
  return supabase.from("gallery").delete().eq("id", id);
}
