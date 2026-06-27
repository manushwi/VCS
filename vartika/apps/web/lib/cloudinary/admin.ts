import crypto from "crypto";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const apiKey = process.env.CLOUDINARY_API_KEY || "";
const apiSecret = process.env.CLOUDINARY_API_SECRET || "";

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

export interface CloudinaryImage {
  publicId: string;
  url: string;
  caption: string;
  createdAt: string;
  width: number;
  height: number;
}

export async function listGalleryImages(): Promise<CloudinaryImage[]> {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=100&context=true`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return (data.resources || []).map((r: Record<string, unknown>) => {
    const ctx = r.context as Record<string, { caption?: string }> | undefined;
    return {
      publicId: r.public_id as string,
      url: r.secure_url as string,
      caption: ctx?.custom?.caption || (r as Record<string, string>).display_name || "",
      createdAt: r.created_at as string,
      width: (r as Record<string, number>).width || 0,
      height: (r as Record<string, number>).height || 0,
    };
  });
}

export async function listBrandLogos(): Promise<CloudinaryImage[]> {
  const tag = "brand_logo";
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${tag}?max_results=100&context=true`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return (data.resources || []).map((r: Record<string, unknown>) => {
    const ctx = r.context as Record<string, { caption?: string }> | undefined;
    return {
      publicId: r.public_id as string,
      url: r.secure_url as string,
      caption: ctx?.custom?.caption || (r as Record<string, string>).display_name || "",
      createdAt: r.created_at as string,
      width: (r as Record<string, number>).width || 0,
      height: (r as Record<string, number>).height || 0,
    };
  });
}

export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  const timestamp = Math.floor(Date.now() / 1000);
  const signStr = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signStr).digest("hex");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        public_id: publicId,
        api_key: apiKey,
        timestamp,
        signature,
      }),
    }
  );

  return res.ok;
}
