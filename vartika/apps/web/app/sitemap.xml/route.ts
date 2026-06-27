import { createServiceRoleClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createServiceRoleClient();

  const staticPages = [
    { slug: "", changefreq: "weekly", priority: "1.0" },
    { slug: "about", changefreq: "monthly", priority: "0.8" },
    { slug: "services", changefreq: "weekly", priority: "0.9" },
    { slug: "gallery", changefreq: "weekly", priority: "0.7" },
    { slug: "book", changefreq: "monthly", priority: "0.9" },
    { slug: "contact", changefreq: "monthly", priority: "0.6" },
  ] as const;

  const { data: services } = await supabase
    .from("services")
    .select("slug, updated_at")
    .eq("is_active", true);

  const { data: locations } = await supabase
    .from("location_seo")
    .select("slug, updated_at")
    .eq("is_active", true);

  const urls: string[] = [];

  for (const page of staticPages) {
    urls.push(`  <url>
    <loc>${SITE_URL}/${page.slug}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);
  }

  if (services) {
    for (const svc of services) {
      urls.push(`  <url>
    <loc>${SITE_URL}/services/${svc.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${svc.updated_at ? `<lastmod>${new Date(svc.updated_at).toISOString()}</lastmod>` : ""}
  </url>`);
    }
  }

  if (locations) {
    for (const loc of locations) {
      urls.push(`  <url>
    <loc>${SITE_URL}/${loc.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    ${loc.updated_at ? `<lastmod>${new Date(loc.updated_at).toISOString()}</lastmod>` : ""}
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
