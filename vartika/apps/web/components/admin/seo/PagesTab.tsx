"use client";

import { useEffect, useState } from "react";
import {
  getAllSeoSettings,
  upsertSeoSettings,
} from "@/lib/supabase/queries/seo";
import { toast } from "@/components/ui/Toast";
import type { SeoSettingsRow } from "@/lib/types/seo";
import { SEO_PAGES, SCHEMA_TYPES } from "@/lib/types/seo";

export default function PagesTab() {
  const [pages, setPages] = useState<SeoSettingsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<SeoSettingsRow | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllSeoSettings()
      .then(({ data }) => {
        if (data) setPages(data as SeoSettingsRow[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const pageMap = new Map(pages.map((p) => [p.page_slug, p]));

  const openEdit = (slug: string) => {
    const existing = pageMap.get(slug);
    if (existing) {
      setEditing(existing);
    } else {
      setEditing({
        id: "",
        page_slug: slug,
        slug: slug === "home" ? "" : slug,
        meta_title: null,
        meta_desc: null,
        og_image: null,
        keywords: null,
        focus_keywords: null,
        canonical_url: null,
        og_title: null,
        og_description: null,
        twitter_title: null,
        twitter_description: null,
        twitter_image: null,
        no_index: false,
        no_follow: false,
        schema_type: null,
        updated_at: "",
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = {
      page_slug: editing.page_slug,
      meta_title: fd.get("meta_title") || null,
      meta_desc: fd.get("meta_desc") || null,
      og_image: fd.get("og_image") || null,
      keywords: (fd.get("keywords") as string)?.split(",").map((k) => k.trim()).filter(Boolean) || null,
      focus_keywords: (fd.get("focus_keywords") as string)?.split(",").map((k) => k.trim()).filter(Boolean) || null,
      canonical_url: fd.get("canonical_url") || null,
      og_title: fd.get("og_title") || null,
      og_description: fd.get("og_description") || null,
      twitter_title: fd.get("twitter_title") || null,
      twitter_description: fd.get("twitter_description") || null,
      twitter_image: fd.get("twitter_image") || null,
      no_index: fd.get("no_index") === "true",
      no_follow: fd.get("no_follow") === "true",
      schema_type: fd.get("schema_type") || null,
    };

    if (editing.id) payload.id = editing.id;

    const { data, error } = await upsertSeoSettings(payload);
    if (error) {
      toast("Failed to save", "error");
    } else if (data) {
      setPages((prev) => {
        const idx = prev.findIndex((p) => p.id === data.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = data as SeoSettingsRow;
          return next;
        }
        return [data as SeoSettingsRow, ...prev];
      });
      toast("SEO settings saved");
      setEditing(null);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-white/4">
              <div className="h-4 w-24 bg-white/5 rounded-8" />
              <div className="flex-1 h-4 bg-white/5 rounded-8" />
              <div className="h-4 w-32 bg-white/5 rounded-8" />
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
              {["Page", "Meta Title", "Meta Description", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-[10px] tracking-widest uppercase text-white/25 px-5 py-2.5 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SEO_PAGES.map(({ page_slug, label }) => {
              const p = pageMap.get(page_slug);
              return (
                <tr
                  key={page_slug}
                  className="border-b border-white/3 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-white/75">{label}</span>
                    <div className="text-[10px] text-white/25 font-mono">/{page_slug === "home" ? "" : page_slug}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/50 max-w-[200px] truncate">
                    {p?.meta_title || <span className="text-[#EAB308]">Missing</span>}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-white/50 max-w-[250px] truncate">
                    {p?.meta_desc || <span className="text-[#EAB308]">Missing</span>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs"
                      onClick={() => openEdit(page_slug)}
                    >
                      ✎
                    </span>
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
            <h3 className="text-base font-semibold text-white/85 mb-5">
              {SEO_PAGES.find((p) => p.page_slug === editing.page_slug)?.label} — SEO Settings
            </h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Meta Title</label>
                <input name="meta_title" defaultValue={editing.meta_title || ""} maxLength={60}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Meta Description</label>
                <textarea name="meta_desc" defaultValue={editing.meta_desc || ""} maxLength={160} rows={2}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Title</label>
                  <input name="og_title" defaultValue={editing.og_title || ""} maxLength={60}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Description</label>
                  <input name="og_description" defaultValue={editing.og_description || ""} maxLength={160}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">OG Image URL</label>
                <input name="og_image" defaultValue={editing.og_image || ""}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Twitter Title</label>
                  <input name="twitter_title" defaultValue={editing.twitter_title || ""} maxLength={60}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Twitter Description</label>
                  <input name="twitter_description" defaultValue={editing.twitter_description || ""} maxLength={160}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
                </div>
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Twitter Image URL</label>
                <input name="twitter_image" defaultValue={editing.twitter_image || ""}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Canonical URL</label>
                <input name="canonical_url" defaultValue={editing.canonical_url || ""}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40 font-mono" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Keywords <span className="text-white/15">(comma-separated)</span></label>
                <input name="keywords" defaultValue={(editing.keywords || []).join(", ")}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div>
                <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Focus Keywords <span className="text-white/15">(comma-separated)</span></label>
                <input name="focus_keywords" defaultValue={(editing.focus_keywords || []).join(", ")}
                  className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Schema Type</label>
                  <select name="schema_type" defaultValue={editing.schema_type || ""}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40">
                    <option value="">None</option>
                    {SCHEMA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Index</label>
                  <select name="no_index" defaultValue={editing.no_index ? "true" : "false"}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40">
                    <option value="false">Index</option>
                    <option value="true">NoIndex</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-widest uppercase text-white/25 mb-1 block">Follow</label>
                  <select name="no_follow" defaultValue={editing.no_follow ? "true" : "false"}
                    className="w-full bg-black/20 border border-white/6 rounded-8 px-3 py-2 text-sm text-white/70 outline-none focus:border-accent2/40">
                    <option value="false">Follow</option>
                    <option value="true">NoFollow</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <button type="button"
                  className="px-4 py-2 bg-white/5 border border-white/6 text-white/50 rounded-full text-xs hover:text-white/70 transition-all cursor-pointer"
                  onClick={() => setEditing(null)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit"
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${saving ? "bg-accent/50 text-white/50 animate-pulse" : "bg-accent text-white hover:bg-accent2"}`}
                  disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
