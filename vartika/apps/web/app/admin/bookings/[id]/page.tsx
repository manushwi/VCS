"use client";

import { useParams } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const dummyBooking = {
  id: "1",
  customer_name: "Ravi Kumar",
  phone: "+91 98110 22334",
  whatsapp: "+91 98110 22334",
  email: "ravi@email.com",
  service_slug: "Floor Polish",
  property_type: "home",
  preferred_date: "2025-06-25",
  time_slot: "Morning (8–12)",
  city: "Noida",
  notes: "Please call before arriving.",
  status: "new",
};

export default function BookingDetailPage() {
  const params = useParams();
  const booking = dummyBooking;

  const waMessage = `Hi ${booking.customer_name}, your ${booking.service_slug} booking with Vartika is confirmed for ${booking.preferred_date}. Our team will arrive during ${booking.time_slot}. Reply OK to confirm.`;

  return (
    <div>
      <h2 className="text-lg font-semibold text-white/85 mb-5">
        Booking #{params.id}
      </h2>
      <div className="bg-[#161714] border border-white/6 rounded-12 p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
          {[
            { label: "Customer", value: booking.customer_name },
            { label: "Phone", value: booking.phone },
            { label: "WhatsApp", value: booking.whatsapp },
            { label: "Email", value: booking.email },
            { label: "Service", value: booking.service_slug },
            { label: "Property Type", value: booking.property_type },
            { label: "Date", value: booking.preferred_date },
            { label: "Time", value: booking.time_slot },
            { label: "City", value: booking.city },
            {
              label: "Status",
              value: (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] border bg-[rgba(200,217,200,0.08)] border-[rgba(200,217,200,0.2)] text-accent2">
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </span>
              ),
            },
          ].map((field) => (
            <div key={field.label}>
              <div className="text-[10px] tracking-widest uppercase text-white/25 mb-1">
                {field.label}
              </div>
              <div className="text-sm text-white/70">{field.value}</div>
            </div>
          ))}
        </div>

        {booking.notes && (
          <div className="mb-6">
            <div className="text-[10px] tracking-widest uppercase text-white/25 mb-1">
              Notes
            </div>
            <p className="text-sm text-white/50">{booking.notes}</p>
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent2 transition-all cursor-pointer">
            Mark as Confirmed
          </button>
          <button className="px-4 py-2 bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.2)] text-[#25D366] rounded-full text-xs font-medium hover:bg-[rgba(37,211,102,0.15)] transition-all cursor-pointer"
            onClick={() => window.open(buildWhatsAppUrl(waMessage), "_blank")}
          >
            Send WhatsApp Confirmation
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/6 text-white/50 rounded-full text-xs hover:text-white/75 transition-all cursor-pointer">
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
}
