"use client";

import { useEffect, useState } from "react";
import {
  getActiveServices,
} from "@/lib/supabase/queries/services";
import {
  getAllServiceSeo,
  upsertServiceSeo,
} from "@/lib/supabase/queries/seo";
import { toast } from "@/components/ui/Toast";
import type { ServiceSeoRow } from "@/lib/types/seo";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
}

export default function ServicesTab() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [seoMap, setSeoMap] = useState<Map<string, ServiceSeoRow>>(new Map());
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ service: ServiceItem; seo: ServiceSeoRow | null } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      getActiveServices(),
      getAllServiceSeo(),
    ]).then(([{ data: svcData }, { data: seoData }]) => {
      if (svcData) setServices(svcData as ServiceItem[]);
      if (seoData) {
        const map = new Map<string, ServiceSeoRow>();
        (seoData as ServiceSeoRow[]).forEach((s) => map.set(s.service_id, s));
        setSeoMap(map);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const openEdit = (svc: ServiceItem) => {
    const seo = seoMap.get(svc.id) || null;
    setEditing({ service: svc, seo });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    const faqs: { question: string; answer: string }[] = [];
    const faqQuestions = form.querySelectorAll('[name="faq_question"]') as NodeListOf<HTMLInputElement>;
    const faqAnswers = form.querySelectorAll('[name="faq_answer"]') as NodeListOf<HTMLInputElement>;
    faqQuestions.forEach((q, i) => {
      if (q.value.trim()) {
        faqs.push({ question: q.value, answer: faqAnswers[i]?.value || "" });
      }
    });

    const payload: Record<string, unknown> = {
      service_id: editing.service.id,
      seo_title: fd.get("seo_title") || null,
      seo_description: fd.get("seo_description") || null,
      keywords: (fd.get("keywords") as string)?.split(",").map((k) => k.trim()).filter(Boolean) || null,
      og_title: fd.get("og_title") || null,
      og_description: fd.get("og_description") || null,
      og_image: fd.get("og_image") || null,
      faqs: faqs,
      schema_json: {},
    };

    if (editing.seo?.id) payload.id = editing.seo.id;

    const { data, error } = await upsertServiceSeo(payload);
    if (error) {
      toast("Failed to save", "error");
    } else if (data) {
      setSeoMap((prev) => {
        const next = new Map(prev);
        next.set(editing.service.id, data as ServiceSeoRow);
        return next;
      });
      toast("Service SEO saved");
      setEditing(null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-white/4">
              <div className="h-4 w-32 bg-white/5 rounded-8" />
              <div className="flex-1 h-4 bg-white/5 rounded-8" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/4">
              {["Service", "SEO Title", "SEO Description", "Actions"].map((h) => (
                <th key={h} className="text-[10px] tracking-widest uppercase text-white/25 px-5 py-2.5 text-left whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => {
              const seo = seoMap.get(svc.id);
              return (
                <tr key={svc.id} className="border-b border-white/3 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-white/75">{svc.name}</span>
                    <div className="text-[10px] text-white/25 font-mono">/services/{svc.slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/50 max-w-[200px] truncate">
                    {seo?.seo_title || <span className="text-[#EAB308]">Not set</span>}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/50 max-w-[250px] truncate">
                    {seo?.seo_description || <span className="text-[#EAB308]">Not set</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs"
                      onClick={() => openEdit(svc)}
                    >✎</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161714] border border-white/6 rounded-16 p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-semibold text-white/85 mb-5">{editing.service.name} — SEO</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">SEO Title</label>
                <input name="seo_title" defaultValue={editing.seo?.seo_title || ""} maxLength={60}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">SEO Description</label>
                <textarea name="seo_description" defaultValue={editing.seo?.seo_description || ""} maxLength={160} rows={2}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40 resize-none" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Keywords <span className="text-white/15">(comma-separated)</span></label>
                <input name="keywords" defaultValue={(editing.seo?.keywords || []).join(", ")}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Title</label>
                  <input name="og_title" defaultValue={editing.seo?.og_title || ""} maxLength={60}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Description</label>
                  <input name="og_description" defaultValue={editing.seo?.og_description || ""} maxLength={160}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Image URL</label>
                <input name="og_image" defaultValue={editing.seo?.og_image || ""}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>

              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">FAQs</label>
                <div id="faqs-container">
                  {(editing.seo?.faqs?.length ? editing.seo.faqs : [{ question: "", answer: "" }]).map((faq, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input name="faq_question" defaultValue={faq.question} placeholder="Question"
                        className="flex-1 bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                      <input name="faq_answer" defaultValue={faq.answer} placeholder="Answer"
                        className="flex-1 bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                    </div>
                  ))}
                </div>
                <button type="button"
                  className="text-[10px] text-accent hover:text-accent2 transition-colors cursor-pointer"
                  onClick={() => {
                    const container = document.getElementById("faqs-container");
                    if (!container) return;
                    const div = document.createElement("div");
                    div.className = "flex gap-2 mb-2";
                    div.innerHTML = `<input name="faq_question" placeholder="Question" class="flex-1 bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" /><input name="faq_answer" placeholder="Answer" class="flex-1 bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />`;
                    container.appendChild(div);
                  }}
                >+ Add FAQ</button>
              </div>

              <div className="flex gap-2 justify-end mt-6">
                <button type="button"
                  className="px-4 py-2 bg-white/5 border border-white/6 text-white/50 rounded-full text-xs hover:text-white/70 transition-all cursor-pointer"
                  onClick={() => setEditing(null)} disabled={saving}>Cancel</button>
                <button type="submit"
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${saving ? "bg-accent/50 text-white/50 animate-pulse" : "bg-accent text-white hover:bg-accent2"}`}
                  disabled={saving}>{saving ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
