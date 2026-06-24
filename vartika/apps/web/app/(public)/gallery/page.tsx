"use client";

import { useState } from "react";

const categories = [
  { key: "all", label: "All" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "living", label: "Living Room" },
  { key: "office", label: "Office" },
  { key: "floor", label: "Floor" },
];

const images = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", cat: "kitchen", badge: "After", caption: "Kitchen · Gurgaon" },
  { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&h=500&q=80", cat: "living", badge: "After", caption: "Living Room · Delhi" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&h=700&q=80", cat: "bathroom", badge: "After", caption: "Bathroom · Noida" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80", cat: "floor", badge: "Before", caption: "Floor · Faridabad" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&h=450&q=80", cat: "kitchen", badge: "After", caption: "Kitchen · Noida" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=400&q=80", cat: "living", badge: "After", caption: "Living Room · Gurgaon" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=500&q=80", cat: "office", badge: "After", caption: "Office · Delhi" },
  { src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80", cat: "living", badge: "After", caption: "Full Apartment · Greater Noida" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&h=450&q=80", cat: "floor", badge: "After", caption: "Full Interior · Delhi" },
  { src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=600&h=600&q=80", cat: "bathroom", badge: "After", caption: "Bedroom · Noida" },
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&h=400&q=80", cat: "office", badge: "After", caption: "Commercial · Gurgaon" },
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=500&q=80", cat: "kitchen", badge: "After", caption: "Sofa Cleaning · Delhi" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("all");

  return (
    <div className="min-h-screen pt-[120px] pb-20 px-12 bg-bg max-md:px-5">
      <div className="text-center mb-12">
        <div className="section-eyebrow flex justify-center">Portfolio</div>
        <h1 className="section-title text-center">
          Before &amp; after.<br />
          <em>Every time.</em>
        </h1>
        <p className="section-sub text-center mx-auto">
          A visual record of spaces transformed by the Vartika standard.
        </p>
      </div>

      <div className="flex gap-2 justify-center flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`px-5 py-2 rounded-full border text-sm cursor-pointer transition-all ${
              active === cat.key
                ? "bg-accent text-white border-accent"
                : "border-bd2 text-ink3 hover:border-accent hover:text-accent"
            }`}
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="columns-4 gap-3.5 max-md:columns-2">
        {images
          .filter((img) => active === "all" || img.cat === active)
          .map((img, i) => (
            <div
              key={i}
              data-lightbox
              className="break-inside-avoid mb-3.5 rounded-12 overflow-hidden relative cursor-pointer group"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span
                className={`absolute top-2.5 left-2.5 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-semibold ${
                  img.badge === "Before"
                    ? "bg-ink/70 text-white/80"
                    : "bg-accent text-white"
                }`}
              >
                {img.badge}
              </span>
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-5 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs tracking-wider uppercase">
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
