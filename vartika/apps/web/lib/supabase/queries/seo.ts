import { createClient } from "../client";

/* ─── seo_settings ─── */

export async function getSeoSettings(pageSlug: string) {
  const supabase = createClient();
  return supabase.from("seo_settings").select("*").eq("page_slug", pageSlug).single();
}

export async function getAllSeoSettings() {
  const supabase = createClient();
  return supabase.from("seo_settings").select("*").order("page_slug");
}

export async function upsertSeoSettings(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("seo_settings").upsert(data).select().single();
}

/* ─── service_seo ─── */

export async function getServiceSeo(serviceId: string) {
  const supabase = createClient();
  return supabase.from("service_seo").select("*").eq("service_id", serviceId).single();
}

export async function getAllServiceSeo() {
  const supabase = createClient();
  return supabase.from("service_seo").select("*").order("created_at");
}

export async function upsertServiceSeo(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("service_seo").upsert(data).select().single();
}

/* ─── location_seo ─── */

export async function getLocationSeo(slug: string) {
  const supabase = createClient();
  return supabase.from("location_seo").select("*").eq("slug", slug).single();
}

export async function getAllLocationSeo() {
  const supabase = createClient();
  return supabase.from("location_seo").select("*, services(name)").order("slug");
}

export async function upsertLocationSeo(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("location_seo").upsert(data).select().single();
}

export async function deleteLocationSeo(id: string) {
  const supabase = createClient();
  return supabase.from("location_seo").delete().eq("id", id);
}

/* ─── local_business_settings ─── */

export async function getLocalBusinessSettings() {
  const supabase = createClient();
  return supabase.from("local_business_settings").select("*").limit(1).maybeSingle();
}

export async function upsertLocalBusinessSettings(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("local_business_settings").upsert(data).select().single();
}

/* ─── redirects ─── */

export async function getAllRedirects() {
  const supabase = createClient();
  return supabase.from("redirects").select("*").order("source");
}

export async function getActiveRedirects() {
  const supabase = createClient();
  return supabase.from("redirects").select("*").eq("is_active", true);
}

export async function upsertRedirect(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("redirects").upsert(data).select().single();
}

export async function deleteRedirect(id: string) {
  const supabase = createClient();
  return supabase.from("redirects").delete().eq("id", id);
}
