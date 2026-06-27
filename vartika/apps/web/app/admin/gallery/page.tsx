"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface GalleryImage {
  publicId: string;
  url: string;
  caption: string;
  createdAt: string;
}

type UploadStatus = "idle" | "uploading" | "done" | "error";

const FEATURED_LIMIT = 6;

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [featuredIds, setFeaturedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) setImages(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  const fetchFeatured = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery/featured");
      if (res.ok) {
        const rows = await res.json();
        setFeaturedIds(new Set(rows.map((r: { cloudinary_id: string }) => r.cloudinary_id)));
      }
    } catch {}
  }, []);

  useEffect(() => {
    Promise.all([fetchImages(), fetchFeatured()]);
  }, [fetchImages, fetchFeatured]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      uploadForm.append("tags", "gallery");

      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadForm });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { publicId, url, caption } = await uploadRes.json();

      setImages((prev) => [
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
    const res = await fetch(`/api/gallery?publicId=${publicId}`, { method: "DELETE" });
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      setFeaturedIds((prev) => {
        const next = new Set(prev);
        next.delete(publicId);
        return next;
      });
    }
    setDeleting(null);
  };

  const handleToggleFeatured = async (publicId: string, imageUrl: string, caption: string) => {
    const isFeatured = featuredIds.has(publicId);
    setToggling(publicId);

    try {
      if (isFeatured) {
        const res = await fetch("/api/gallery/featured", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloudinary_id: publicId }),
        });
        if (res.ok) {
          setFeaturedIds((prev) => {
            const next = new Set(prev);
            next.delete(publicId);
            return next;
          });
        }
      } else {
        if (featuredIds.size >= FEATURED_LIMIT) {
          alert(`Maximum ${FEATURED_LIMIT} featured images allowed. Remove one first.`);
          return;
        }
        const res = await fetch("/api/gallery/featured", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloudinary_id: publicId, image_url: imageUrl, caption }),
        });
        if (res.ok) {
          setFeaturedIds((prev) => new Set(prev).add(publicId));
        } else {
          const body = await res.json();
          alert(body.error || "Failed to feature image");
        }
      }
    } catch {}
    setToggling(null);
  };

  const btnLabel = {
    idle: "+ Upload Image",
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
        <div>
          <h2 className="text-lg font-semibold text-white/85">Gallery</h2>
          <p className="text-xs text-white/30 mt-1">
            {featuredIds.size}/{FEATURED_LIMIT} featured — click ♥ to mark images for the home page preview
          </p>
        </div>
        <label
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${btnStyle}`}
        >
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
        <div className="animate-pulse">
          <div className="bg-[#161714] border border-white/6 rounded-12 p-8 mb-5">
            <div className="h-12 w-full bg-white/5 rounded-12" />
          </div>
          <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-[4/5] bg-white/5 rounded-12" />
            ))}
          </div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-white/20 text-sm">
          No images yet. Upload your first image.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
          {images.map((img, i) => {
            const isFeatured = featuredIds.has(img.publicId);
            const atLimit = featuredIds.size >= FEATURED_LIMIT;
            return (
              <div
                key={img.publicId}
                className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "backwards" }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm cursor-pointer transition-all ${
                        toggling === img.publicId
                          ? "bg-white/10 text-white/40 animate-pulse"
                          : isFeatured
                            ? "bg-[rgba(239,68,68,0.2)] text-[#EF4444]"
                            : "bg-white/10 text-white/60 hover:bg-[rgba(239,68,68,0.15)] hover:text-[#EF4444]"
                      }`}
                      onClick={() => handleToggleFeatured(img.publicId, img.url, img.caption)}
                      title={
                        isFeatured
                          ? "Remove from featured"
                          : atLimit
                            ? `Max ${FEATURED_LIMIT} featured`
                            : "Add to featured"
                      }
                    >
                      {toggling === img.publicId ? "..." : isFeatured ? "♥" : "♡"}
                    </span>
                    <span
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm cursor-pointer transition-all ${
                        deleting === img.publicId
                          ? "bg-red-400/20 text-[#EF4444] animate-pulse"
                          : "bg-white/10 text-white/60 hover:bg-red-400/20 hover:text-[#EF4444]"
                      }`}
                      onClick={() => handleDelete(img.publicId)}
                      title="Delete"
                    >
                      {deleting === img.publicId ? "..." : "✕"}
                    </span>
                  </div>
                  {isFeatured && (
                    <div className="absolute top-2 left-2 bg-[rgba(239,68,68,0.85)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-3 text-xs text-white/50 truncate">
                  {img.caption || "Untitled"}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
