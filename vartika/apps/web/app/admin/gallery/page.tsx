"use client";

import { useState } from "react";

const dummyImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=60", caption: "Kitchen", type: "after" },
  { id: "2", url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=300&q=60", caption: "Bathroom", type: "after" },
  { id: "3", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=60", caption: "Floor", type: "before" },
];

export default function AdminGalleryPage() {
  const [images] = useState(dummyImages);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white/85">Gallery</h2>
        <button className="px-4 py-2 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent2 transition-all cursor-pointer">
          + Upload Image
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <span className="w-8 h-8 flex items-center justify-center rounded bg-white/10 text-white/60 cursor-pointer hover:bg-white/20 text-sm">
                  ✎
                </span>
                <span className="w-8 h-8 flex items-center justify-center rounded bg-white/10 text-white/60 cursor-pointer hover:bg-white/20 text-sm">
                  ✕
                </span>
              </div>
            </div>
            <div className="p-3">
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                  img.type === "before"
                    ? "bg-ink/70 text-white/80"
                    : "bg-accent text-white"
                }`}
              >
                {img.type}
              </span>
              <span className="text-xs text-white/50 ml-2">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
