"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx.current}px, ${my.current}px)`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const anim = () => {
      rx.current = lerp(rx.current, mx.current, 0.12);
      ry.current = lerp(ry.current, my.current, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx.current}px, ${ry.current}px)`;
      }
      requestAnimationFrame(anim);
    };

    const grow = () => document.body.classList.add("cursor-grow");
    const shrink = () => document.body.classList.remove("cursor-grow");

    document.addEventListener("mousemove", onMove);
    requestAnimationFrame(anim);

    const targets = document.querySelectorAll(
      "a, button, [onclick], [role='button'], input, textarea, select"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cx-dot"
        className="fixed w-[6px] h-[6px] bg-accent rounded-full pointer-events-none z-[99999] transition-transform duration-100"
        style={{ top: -3, left: -3 }}
      />
      <div
        ref={ringRef}
        id="cx-ring"
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[99999]"
        style={{
          top: -16,
          left: -16,
          border: "1.5px solid rgba(61,89,72,0.5)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
