import { NextResponse } from "next/server";

export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("__dev_admin", "true", {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  return response;
}
