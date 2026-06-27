import { NextRequest, NextResponse } from "next/server";
import transporter from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json();

    if (!to) {
      return NextResponse.json({ error: "Missing 'to' field" }, { status: 400 });
    }

    const FROM_ADDRESS = process.env.FROM_EMAIL || "noreply@vartika.in";

    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to,
      subject: "Test Email — Vartika",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#3d5948">SMTP is working!</h2>
          <p>This is a test email from Vartika Cleaning Solutions.</p>
          <p style="font-size:12px;color:#999">Sent at ${new Date().toLocaleString("en-IN")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error("Test email failed:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
