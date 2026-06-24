import { createClient } from "../client";

export async function getSeoSettings(pageSlug: string) {
  const supabase = createClient();
  return supabase
    .from("seo_settings")
    .select("*")
    .eq("page_slug", pageSlug)
    .single();
}

export async function upsertSeoSettings(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("seo_settings").upsert(data).select().single();
}
