import { z } from "zod";

export const bookingSchema = z.object({
  customer_name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  service_slug: z.string().min(1, "Select a service"),
  property_type: z.enum(["home", "office", "commercial"]),
  area_sqft: z.number().optional(),
  preferred_date: z.string().min(1, "Select a date"),
  time_slot: z.enum(["morning", "afternoon", "evening"]),
  state: z.string().optional(),
  district: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
  source: z.enum(["google", "whatsapp", "friend", "social", "other"]).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
