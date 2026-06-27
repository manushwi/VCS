"use client";

import { useEffect, useState } from "react";
import { getAllSeoSettings } from "@/lib/supabase/queries/seo";
import type { SeoSettingsRow } from "@/lib/types/seo";

interface HealthMetrics {
  total: number;
  missingTitle: number;
  missingDesc: number;
  missingOg: number;
  missingCanonical: number;
  missingSchema: number;
}

export default function SeoDashboard() {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSeoSettings()
      .then(({ data }) => {
        const rows = (data as SeoSettingsRow[]) || [];
        const m: HealthMetrics = {
          total: rows.length,
          missingTitle: rows.filter((r) => !r.meta_title).length,
          missingDesc: rows.filter((r) => !r.meta_desc).length,
          missingOg: rows.filter((r) => !r.og_image).length,
          missingCanonical: rows.filter((r) => !r.canonical_url).length,
          missingSchema: rows.filter((r) => !r.schema_type).length,
        };
        setMetrics(m);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#161714] border border-white/6 rounded-12 p-5 animate-pulse">
            <div className="h-3 w-20 bg-white/5 rounded-8 mb-3" />
            <div className="h-8 w-12 bg-white/5 rounded-8" />
          </div>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const score = Math.round(
    ((metrics.total * 5
      - metrics.missingTitle
      - metrics.missingDesc
      - metrics.missingOg
      - metrics.missingCanonical
      - metrics.missingSchema)
      / (metrics.total * 5))
      * 100
  );

  const scoreColor =
    score >= 80 ? "text-[#22C55E]"
    : score >= 50 ? "text-[#EAB308]"
    : "text-[#EF4444]";

  const cards = [
    { label: "SEO Health Score", value: `${score}%`, color: scoreColor },
    { label: "Total Pages", value: metrics.total, color: "text-white/85" },
    { label: "Missing Meta Titles", value: metrics.missingTitle, color: metrics.missingTitle ? "text-[#EAB308]" : "text-[#22C55E]" },
    { label: "Missing Descriptions", value: metrics.missingDesc, color: metrics.missingDesc ? "text-[#EAB308]" : "text-[#22C55E]" },
    { label: "Missing OG Images", value: metrics.missingOg, color: metrics.missingOg ? "text-[#EAB308]" : "text-[#22C55E]" },
    { label: "Missing Canonicals", value: metrics.missingCanonical, color: metrics.missingCanonical ? "text-[#EAB308]" : "text-[#22C55E]" },
    { label: "Missing Schema", value: metrics.missingSchema, color: metrics.missingSchema ? "text-[#EAB308]" : "text-[#22C55E]" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className="bg-[#161714] border border-white/6 rounded-12 p-5">
          <div className="text-[10px] tracking-widest uppercase text-white/25 mb-2">{card.label}</div>
          <div className={`text-2xl font-semibold ${card.color}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}
