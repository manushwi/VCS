import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { listGalleryImages } from "@/lib/cloudinary/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageSlug: "gallery" });
}

export default async function GalleryPage() {
  const images = await listGalleryImages();

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

      {images.length === 0 ? (
        <div className="text-center py-16 text-white/20 text-sm">
          No images yet.
        </div>
      ) : (
        <div className="columns-4 gap-3.5 max-md:columns-2">
          {images.map((img) => (
            <div
              key={img.publicId}
              data-lightbox
              className="break-inside-avoid mb-3.5 rounded-12 overflow-hidden relative cursor-pointer group"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-5 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs tracking-wider uppercase">
                    {img.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
