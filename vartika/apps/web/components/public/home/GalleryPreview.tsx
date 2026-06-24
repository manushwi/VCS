"use client";

import Link from "next/link";

const items = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    caption: "Kitchen Restoration · Gurgaon",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=400&q=80",
    caption: "Deep Clean · Noida",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&h=700&q=80",
    caption: "Bathroom · Delhi",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80",
    caption: "Kitchen · Faridabad",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&h=400&q=80",
    caption: "Living Room · Delhi",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    caption: "Full Apartment · Greater Noida",
    tall: true,
  },
];

export default function GalleryPreview() {
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
        {items.map((item, i) => (
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
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-5 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs tracking-wider uppercase">
                {item.caption}
              </span>
            </div>
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
