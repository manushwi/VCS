"use client";

import { useEffect, useCallback, useState } from "react";

export default function Lightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    setSrc("");
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const item = target.closest("[data-lightbox]") as HTMLElement | null;
      if (!item) return;
      const img = item.querySelector("img");
      if (img) {
        setSrc(img.src);
        setOpen(true);
        document.body.style.overflow = "hidden";
      }
    };
    document.addEventListener("click", handler);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  if (!open) return null;

  return (
    <div
      id="lightbox"
      className="fixed inset-0 bg-black/92 z-[9990] flex items-center justify-center p-10 cursor-pointer"
      onClick={close}
    >
      <span className="absolute top-6 right-8 text-3xl text-white/60 cursor-pointer hover:text-white transition-colors">
        ✕
      </span>
      <img
        src={src}
        alt=""
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-12"
      />
    </div>
  );
}
