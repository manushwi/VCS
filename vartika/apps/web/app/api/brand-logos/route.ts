import { NextRequest, NextResponse } from "next/server";
import { listBrandLogos, deleteCloudinaryImage } from "@/lib/cloudinary/admin";

export async function GET() {
  const logos = await listBrandLogos();
  return NextResponse.json(logos, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function DELETE(request: NextRequest) {
  const publicId = request.nextUrl.searchParams.get("publicId");
  if (!publicId) {
    return NextResponse.json({ error: "publicId required" }, { status: 400 });
  }
  const ok = await deleteCloudinaryImage(publicId);
  if (!ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
