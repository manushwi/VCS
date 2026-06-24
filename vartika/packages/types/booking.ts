export interface Booking {
  id: string;
  customer_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service_slug: string;
  property_type: "home" | "office" | "commercial";
  area_sqft?: number;
  preferred_date: string;
  time_slot: "morning" | "afternoon" | "evening";
  city: string;
  notes?: string;
  source?: "google" | "whatsapp" | "friend" | "social" | "other";
  status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export type BookingStatus = Booking["status"];
export type TimeSlot = Booking["time_slot"];
export type PropertyType = Booking["property_type"];
export type BookingSource = Booking["source"];
