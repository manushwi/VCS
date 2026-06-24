import { createClient } from "../client";

export async function getActiveServices() {
  const supabase = createClient();
  return supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
}

export async function getService(slug: string) {
  const supabase = createClient();
  return supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
}

export async function upsertService(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("services").upsert(data).select().single();
}

export async function deleteService(id: string) {
  const supabase = createClient();
  return supabase.from("services").delete().eq("id", id);
}
