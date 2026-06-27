import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const ADMIN_EMAIL = "admin@vartika.in";
const FROM_EMAIL = "Vartika <bookings@vartika.in>";

interface BookingPayload {
  record: {
    id: string;
    customer_name: string;
    phone: string;
    email?: string;
    service_slug: string;
    preferred_date: string;
    time_slot: string;
    state?: string;
    district?: string;
    pincode?: string;
    address?: string;
  };
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });
  return res.json();
}

serve(async (req: Request) => {
  try {
    const body: BookingPayload = await req.json();
    const { customer_name, phone, email, service_slug, preferred_date, time_slot, state, district, pincode, address } = body.record;

    // Email to customer
    const customerHtml = `
      <h2>Thank you, ${customer_name}!</h2>
      <p>Your booking for <strong>${service_slug}</strong> has been received.</p>
      <p><strong>Date:</strong> ${preferred_date}<br>
      <strong>Time:</strong> ${time_slot}</p>
      <p>Our team will contact you within 2 hours to confirm.</p>
    `;

    if (email) {
      await sendEmail(email, "Booking Received — Vartika", customerHtml);
    }

    // Email to admin
    const addressHtml = state
      ? `<p><strong>Address:</strong> ${[address, district, state, pincode].filter(Boolean).join(", ")}</p>`
      : "";
    const adminHtml = `
      <h2>New Booking Received</h2>
      <p><strong>Customer:</strong> ${customer_name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service_slug}</p>
      <p><strong>Date:</strong> ${preferred_date} — ${time_slot}</p>
      ${addressHtml}
    `;

    await sendEmail(ADMIN_EMAIL, `New Booking: ${service_slug} — Vartika`, adminHtml);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
