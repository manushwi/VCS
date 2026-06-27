"use client";

import { useEffect, useCallback, useState } from "react";

interface ImageEntry {
  src: string;
  alt: string;
}

export default function Lightbox() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [index, setIndex] = useState(0);

  const current = images[index];

  const close = useCallback(() => {
    setOpen(false);
    setImages([]);
    setIndex(0);
    document.body.style.overflow = "";
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const item = target.closest("[data-lightbox]") as HTMLElement | null;
      if (!item) return;

      const all = document.querySelectorAll<HTMLElement>("[data-lightbox]");
      const entries: ImageEntry[] = [];
      let found = -1;

      all.forEach((el, i) => {
        const img = el.querySelector("img");
        if (img) {
          entries.push({ src: img.src, alt: img.alt });
          if (el === item) found = i;
        }
      });

      if (found < 0) return;
      setImages(entries);
      setIndex(found);
      setOpen(true);
      document.body.style.overflow = "hidden";
    };

    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && images.length > 1) go(-1);
      if (e.key === "ArrowRight" && images.length > 1) go(1);
    };

    document.addEventListener("click", handler);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [close, go, open, images.length]);

  if (!open || !current) return null;

  const single = images.length <= 1;
  const counterLabel = `${index + 1} / ${images.length}`;

  return (
    <div
      className="fixed inset-0 bg-black/92 z-[9990] flex items-center justify-center select-none"
      onClick={close}
    >
      {/* Close button */}
      <span className="absolute top-6 right-8 z-10 text-3xl text-white/60 cursor-pointer hover:text-white transition-colors">
        ✕
      </span>

      {/* Counter */}
      {!single && (
        <span className="absolute top-6 left-8 text-sm text-white/40 font-mono">
          {counterLabel}
        </span>
      )}

      {/* Left arrow */}
      {!single && (
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-4xl text-white/30 cursor-pointer hover:text-white/80 transition-colors p-2"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
        >
          ‹
        </span>
      )}

      {/* Right arrow */}
      {!single && (
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-4xl text-white/30 cursor-pointer hover:text-white/80 transition-colors p-2"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
        >
          ›
        </span>
      )}

      {/* Image */}
      <div
        className="flex flex-col items-center gap-4 max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-w-[85vw] max-h-[80vh] object-contain rounded-12"
        />
        {current.alt && (
          <span className="text-sm text-white/50 text-center">{current.alt}</span>
        )}
      </div>
    </div>
  );
}
