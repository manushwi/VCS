import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/email";

interface BookingData {
  customer_name: string;
  phone: string;
  email?: string | null;
  service_slug: string;
  preferred_date: string;
  time_slot: string;
  state?: string | null;
  district?: string | null;
  pincode?: string | null;
  address?: string | null;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@vartika.in";
const FROM_ADDRESS = process.env.FROM_EMAIL || "noreply@vartika.in";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json();

    const timeLabel: Record<string, string> = {
      morning: "8–12 AM",
      afternoon: "12–4 PM",
      evening: "4–8 PM",
    };

    const dateStr = new Date(data.preferred_date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const timeStr = timeLabel[data.time_slot] || data.time_slot;

    if (data.email) {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "Booking Received — Vartika",
        html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#3d5948">Thank you, ${data.customer_name}!</h2>
          <p>Your booking for <strong>${data.service_slug}</strong> has been received.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:8px 0;color:#555">Date</td><td style="font-weight:600">${dateStr}</td></tr>
            <tr><td style="padding:8px 0;color:#555">Time</td><td style="font-weight:600">${timeStr}</td></tr>
          </table>
          <p>Our team will contact you within 2 hours to confirm the appointment.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="font-size:12px;color:#999">Vartika Cleaning Solutions</p>
        </div>
        `,
      });
    }

    const addressParts = [data.address, data.district, data.state, data.pincode].filter(Boolean);
    const addressHtml = addressParts.length
      ? `<p><strong>Address:</strong> ${addressParts.join(", ")}</p>`
      : "";

    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${data.service_slug} — Vartika`,
      html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
        <h2 style="color:#3d5948">New Booking Received</h2>
        <table style="width:100%;border-collapse:collapse;margin:20px 0">
          <tr><td style="padding:6px 0;color:#555">Customer</td><td style="font-weight:600">${data.customer_name}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Phone</td><td style="font-weight:600"><a href="tel:${data.phone}" style="color:#3d5948;text-decoration:none">${data.phone}</a></td></tr>
          <tr><td style="padding:6px 0;color:#555">Service</td><td style="font-weight:600">${data.service_slug}</td></tr>
          <tr><td style="padding:6px 0;color:#555">Date</td><td style="font-weight:600">${dateStr} — ${timeStr}</td></tr>
        </table>
        ${addressHtml}
        <p><a href="${SITE_URL}/admin/bookings" style="color:#3d5948">View in Admin →</a></p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
      </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ ok: true });
  }
}
