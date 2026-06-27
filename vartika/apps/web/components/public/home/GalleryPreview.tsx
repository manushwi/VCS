"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CloudinaryImage {
  publicId: string;
  url: string;
  caption: string;
  width: number;
  height: number;
}

const ITEM_COUNT = 6;

export default function GalleryPreview() {
  const [items, setItems] = useState<
    { src: string; caption: string; tall: boolean }[]
  >([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/gallery/featured");
        if (res.ok) {
          const rows = await res.json();
          if (rows.length > 0) {
            setItems(
              rows.slice(0, ITEM_COUNT).map((img: { image_url: string; caption: string }) => ({
                src: img.image_url,
                caption: img.caption || "Gallery",
                tall: false,
              }))
            );
            return;
          }
        }
      } catch {}

      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const images: CloudinaryImage[] = await res.json();
          setItems(
            images.slice(0, ITEM_COUNT).map((img) => ({
              src: img.url,
              caption: img.caption || "Gallery",
              tall: img.width > 0 && img.height > 0 ? img.height > img.width : false,
            }))
          );
        }
      } catch {}
    };
    fetchFeatured();
  }, []);

  return (
    <section className="bg-bg2 px-12 py-[100px] max-md:px-5 max-md:py-16">
      <div className="text-center mb-14">
        <div className="section-eyebrow">Portfolio</div>
        <h2 className="section-title">
          Real transformations.<br />
          <em>Real spaces.</em>
        </h2>
        <p className="section-sub mx-auto">
          Every image is a testament to precision, care, and the Vartika
          standard.
        </p>
      </div>

      <div
        className="columns-3 gap-4 max-md:columns-2"
        style={{ columnCount: 3, columnGap: "16px" }}
      >
        {items.length === 0
          ? Array.from({ length: ITEM_COUNT }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-4 rounded-12 overflow-hidden bg-[#161714] animate-pulse"
                style={{ height: i % 3 === 0 ? "320px" : "220px" }}
              />
            ))
          : items.map((item, i) => (
              <div
                key={i}
                data-lightbox
                className="break-inside-avoid mb-4 rounded-12 overflow-hidden relative cursor-pointer group"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
              </div>
            ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/gallery"
          className="btn inline-flex items-center gap-2 bg-transparent text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-bd2 hover:border-accent hover:text-accent transition-all"
        >
          Explore Full Gallery
        </Link>
      </div>
    </section>
  );
}
