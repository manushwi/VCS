import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/email";
import { customerBookingEmail, adminNotificationEmail } from "@/lib/email-templates";

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

export async function POST(request: NextRequest) {
  try {
    const data: BookingData = await request.json();

    if (data.email) {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: data.email,
        subject: "Booking Received — Vartika Cleaning Solutions",
        html: customerBookingEmail(data),
      });
    }

    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${data.service_slug} — Vartika`,
      html: adminNotificationEmail(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ ok: true });
  }
}
