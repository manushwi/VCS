import { createClient } from "../client";

export async function insertBooking(data: Record<string, unknown>) {
  const supabase = createClient();
  return supabase.from("bookings").insert(data);
}

export async function getBookings() {
  const supabase = createClient();
  return supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function getBooking(id: string) {
  const supabase = createClient();
  return supabase.from("bookings").select("*").eq("id", id).single();
}

export async function updateBooking(
  id: string,
  data: Record<string, unknown>
) {
  const supabase = createClient();
  return supabase.from("bookings").update(data).eq("id", id).select().single();
}
