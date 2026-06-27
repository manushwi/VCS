"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error";

interface ToastData {
  message: string;
  type: ToastType;
}

let pushToast: (data: ToastData) => void = () => {};

export function toast(message: string, type: ToastType = "success") {
  pushToast({ message, type });
}

export default function ToastContainer() {
  const [items, setItems] = useState<(ToastData & { id: number })[]>([]);

  pushToast = useCallback((data: ToastData) => {
    const id = Date.now();
    setItems((prev) => [...prev, { ...data, id }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-4 py-2.5 rounded-8 text-sm shadow-lg transition-all animate-slideUp ${
            item.type === "success"
              ? "bg-[rgba(34,197,94,0.15)] border border-[rgba(34,197,94,0.3)] text-[#22C55E]"
              : "bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#EF4444]"
          }`}
        >
          {item.type === "success" ? "✓ " : "✕ "}
          {item.message}
        </div>
      ))}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
