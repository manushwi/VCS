import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const FEATURED_LIMIT = 6;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || [], {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

export async function POST(req: Request) {
  const supabase = getSupabase();
  const { cloudinary_id, image_url, caption } = await req.json();
  if (!cloudinary_id || !image_url) {
    return NextResponse.json({ error: "cloudinary_id and image_url required" }, { status: 400 });
  }

  const { count } = await supabase
    .from("gallery")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true);

  if (count != null && count >= FEATURED_LIMIT) {
    return NextResponse.json(
      { error: `Maximum ${FEATURED_LIMIT} featured images allowed. Remove one first.` },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("gallery")
    .upsert(
      { cloudinary_id, image_url, caption: caption || "", is_featured: true },
      { onConflict: "cloudinary_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = getSupabase();
  const { cloudinary_id } = await req.json();
  if (!cloudinary_id) {
    return NextResponse.json({ error: "cloudinary_id required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("cloudinary_id", cloudinary_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
