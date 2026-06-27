import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { listGalleryImages, deleteCloudinaryImage } from "@/lib/cloudinary/admin";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const images = await listGalleryImages();
  return NextResponse.json(images, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function DELETE(request: NextRequest) {
  const supabase = getSupabase();
  const publicId = request.nextUrl.searchParams.get("publicId");
  if (!publicId) {
    return NextResponse.json({ error: "publicId required" }, { status: 400 });
  }

  const ok = await deleteCloudinaryImage(publicId);
  if (!ok) {
    return NextResponse.json({ error: "Failed to delete from Cloudinary" }, { status: 500 });
  }

  await supabase.from("gallery").delete().eq("cloudinary_id", publicId);

  return NextResponse.json({ ok: true });
}
