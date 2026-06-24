"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = ref.current;
    if (!el) return;
    const start = Date.now();
    const dur = 1800;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target, suffix]);

  return (
    <span ref={ref} className="font-mono text-[42px] font-medium text-accent block mb-1.5 leading-none">
      0{suffix}
    </span>
  );
}

const stats = [
  { target: 2500, suffix: "", label: "Spaces Transformed" },
  { target: 15, suffix: "", label: "Services Offered" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 6, suffix: "", label: "Cities Served" },
];

export default function StatsSection() {
  return (
    <div className="bg-bg2 px-12 py-20 max-md:px-5">
      <div className="max-w-[1100px] mx-auto grid grid-cols-4 max-md:grid-cols-2 gap-px bg-bd">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="bg-bg2 px-10 py-10 text-center max-md:px-6 max-md:py-8"
          >
            <AnimatedNumber target={s.target} suffix={s.suffix} />
            <span className="text-sm text-ink3 tracking-wide">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
