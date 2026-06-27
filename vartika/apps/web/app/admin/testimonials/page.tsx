"use client";

import { useEffect, useState, useRef } from "react";

interface BrandLogo {
  publicId: string;
  url: string;
  caption: string;
  createdAt: string;
}

export default function AdminClientsPage() {
  const [logos, setLogos] = useState<BrandLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/brand-logos")
      .then((res) => res.json())
      .then((data) => {
        setLogos(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("tags", "brand_logo");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { publicId, url, caption } = await uploadRes.json();

      setLogos((prev) => [
        { publicId, url, caption, createdAt: new Date().toISOString() },
        ...prev,
      ]);
      setUploadStatus("done");
      setTimeout(() => setUploadStatus("idle"), 2000);
    } catch {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (publicId: string) => {
    setDeleting(publicId);
    const res = await fetch(`/api/brand-logos?publicId=${publicId}`, { method: "DELETE" });
    if (res.ok) {
      setLogos((prev) => prev.filter((l) => l.publicId !== publicId));
    }
    setDeleting(null);
  };

  const btnLabel = {
    idle: "+ Add Logo",
    uploading: "Uploading...",
    done: "✓ Uploaded",
    error: "✕ Failed",
  }[uploadStatus];

  const btnStyle = {
    idle: "bg-accent text-white hover:bg-accent2",
    uploading: "bg-white/10 text-white/40 animate-pulse",
    done: "bg-[rgba(34,197,94,0.15)] text-[#22C55E]",
    error: "bg-[rgba(239,68,68,0.15)] text-[#EF4444]",
  }[uploadStatus];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white/85">Clients</h2>
        <label className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${btnStyle}`}>
          {uploadStatus === "uploading" && (
            <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5 align-middle" />
          )}
          {btnLabel}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploadStatus === "uploading"}
          />
        </label>
      </div>

      {loading ? (
        <div className="animate-pulse grid grid-cols-6 gap-3.5 max-md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-12" />
          ))}
        </div>
      ) : logos.length === 0 ? (
        <div className="text-center py-16 text-white/20 text-sm">
          No brand logos yet. Upload your first logo.
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-3.5 max-md:grid-cols-3">
          {logos.map((logo) => (
            <div
              key={logo.publicId}
              className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={logo.url}
                  alt={logo.caption}
                  className="w-full h-full object-contain p-3"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm cursor-pointer transition-all ${
                      deleting === logo.publicId
                        ? "bg-red-400/20 text-[#EF4444] animate-pulse"
                        : "bg-white/10 text-white/60 hover:bg-red-400/20 hover:text-[#EF4444]"
                    }`}
                    onClick={() => handleDelete(logo.publicId)}
                    title="Delete"
                  >
                    {deleting === logo.publicId ? "..." : "✕"}
                  </span>
                </div>
              </div>
              <div className="p-2 text-[10px] text-white/40 truncate text-center">
                {logo.caption || "Logo"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
