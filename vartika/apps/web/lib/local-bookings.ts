const STORAGE_KEY = "vartika_local_bookings";

export interface LocalBooking {
  id: string;
  customer_name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  service_slug: string;
  property_type?: string;
  area_sqft?: number;
  preferred_date: string;
  time_slot: string;
  notes?: string;
  source?: string;
  status: string;
  admin_notes?: string;
  state?: string;
  district?: string;
  pincode?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

function generateId(): string {
  return "local_" + crypto.randomUUID();
}

export function getLocalBookings(): LocalBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addLocalBooking(
  data: Record<string, unknown>
): LocalBooking {
  const bookings = getLocalBookings();
  const now = new Date().toISOString();
  const booking: LocalBooking = {
    id: generateId(),
    customer_name: (data.customer_name as string) || "",
    phone: (data.phone as string) || "",
    whatsapp: data.whatsapp as string | undefined,
    email: data.email as string | undefined,
    service_slug: (data.service_slug as string) || "",
    property_type: data.property_type as string | undefined,
    area_sqft: data.area_sqft as number | undefined,
    preferred_date: (data.preferred_date as string) || "",
    time_slot: (data.time_slot as string) || "",
    notes: data.notes as string | undefined,
    source: data.source as string | undefined,
    status: "new",
    state: data.state as string | undefined,
    district: data.district as string | undefined,
    pincode: data.pincode as string | undefined,
    address: data.address as string | undefined,
    created_at: now,
    updated_at: now,
  };
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return booking;
}

export function updateLocalBooking(
  id: string,
  data: Record<string, unknown>
): LocalBooking | null {
  const bookings = getLocalBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bookings[idx] = {
    ...bookings[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return bookings[idx];
}
