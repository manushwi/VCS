import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import { buildLocationMetadata, getJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { LocationSeoRow, FaqItem } from "@/lib/types/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildLocationMetadata(slug);
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createServerSupabase();

  const { data: row } = await supabase
    .from("location_seo")
    .select("*, services(name)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!row) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg pt-[68px]">
        <div className="text-center">
          <h1 className="section-title">Page not found</h1>
          <Link
            href="/"
            className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide mt-4"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const location = row as LocationSeoRow & { services?: { name: string } | null };
  const faqs = (location.faqs || []) as FaqItem[];
  const schemas = await getJsonLd(await createServerSupabase(), "FAQ");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="min-h-screen pt-[120px] pb-20 px-12 bg-bg max-md:px-5">
        <div className="max-w-[800px] mx-auto">
          <Link
            href="/"
            className="text-sm text-ink3 hover:text-accent transition-colors mb-8 inline-block"
          >
            ← Home
          </Link>

          <div className="section-eyebrow">
            {location.location}
            {location.services?.name && (
              <>
                <span className="mx-2 text-ink4">/</span>
                {location.services.name}
              </>
            )}
          </div>

          <h1 className="section-title mt-2">
            {location.seo_title || `${location.services?.name || "Cleaning"} in ${location.location}`}
          </h1>

          {location.seo_description && (
            <p className="section-sub max-w-none mb-8">{location.seo_description}</p>
          )}

          {location.content && (
            <div className="text-[16px] text-ink3 leading-relaxed mb-10 whitespace-pre-line">
              {location.content}
            </div>
          )}

          <Link
            href="/book"
            className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
          >
            Book Now
          </Link>

          {faqs.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-xl font-semibold text-text1 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-bg2 rounded-16 p-6 border border-bd">
                    <h3 className="font-medium text-ink mb-2">{faq.question}</h3>
                    <p className="text-sm text-ink3">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
