"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOut(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="loader"
      className={`fixed inset-0 bg-bg z-[99998] flex flex-col items-center justify-center gap-7 transition-all duration-500 ${
        out ? "opacity-0 -translate-y-full pointer-events-none" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-1.5 opacity-0 animate-[ldFade_0.6s_ease_0.2s_forwards]">
        <img
          src="/logo.svg"
          alt="Vartika"
          className="w-auto h-16 object-contain"
        />
      </div>
      <div className="w-40 h-px bg-bd2 overflow-hidden rounded-px">
        <div className="h-full w-0 bg-accent animate-[ldProg_1.4s_cubic-bezier(0.4,0,0.2,1)_0.4s_forwards]" />
      </div>
      <span className="text-[11px] tracking-widest uppercase text-ink4 opacity-0 animate-[ldFade_0.4s_ease_0.5s_forwards]">
        Preparing your experience
      </span>
      <style jsx>{`
        @keyframes ldFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes ldProg {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
