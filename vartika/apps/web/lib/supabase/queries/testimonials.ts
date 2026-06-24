import { createClient } from "../client";

export async function getActiveTestimonials() {
  const supabase = createClient();
  return supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
}

export async function upsertTestimonial(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("testimonials").upsert(data).select().single();
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  return supabase.from("testimonials").delete().eq("id", id);
}
