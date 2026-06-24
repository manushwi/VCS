"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants/index";

export default function AdminServicesPage() {
  const [services] = useState(SERVICES);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white/85">Services</h2>
        <button className="px-4 py-2 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent2 transition-all cursor-pointer">
          + Add Service
        </button>
      </div>
      <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/4">
              {["Icon", "Name", "Slug", "Price", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-[10px] tracking-widest uppercase text-white/25 px-5 py-2.5 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => (
              <tr
                key={svc.slug}
                className="border-b border-white/3 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3.5 text-lg">{svc.icon}</td>
                <td className="text-sm text-white/75">{svc.name}</td>
                <td className="font-mono text-[11px] text-white/40">{svc.slug}</td>
                <td className="font-mono text-sm text-accent">
                  ₹{svc.basePrice}/{svc.pricingUnit}
                </td>
                <td className="px-5">
                  <div className="flex gap-1">
                    <span className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs">
                      ✎
                    </span>
                    <span className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.12)] transition-all text-xs">
                      ✕
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
