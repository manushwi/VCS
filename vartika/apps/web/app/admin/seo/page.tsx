"use client";

import { useState } from "react";
import PagesTab from "@/components/admin/seo/PagesTab";
import ServicesTab from "@/components/admin/seo/ServicesTab";

const TABS = [
  { id: "pages", label: "Pages" },
  { id: "services", label: "Services" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("pages");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white/85">SEO Management</h2>
      </div>

      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 border-b border-white/6 pb-px overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs tracking-widest uppercase whitespace-nowrap transition-all cursor-pointer rounded-t-8 ${
              activeTab === tab.id
                ? "text-accent bg-[rgba(61,89,72,0.07)] border-b-2 border-accent -mb-px"
                : "text-white/30 hover:text-white/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "pages" && <PagesTab />}
      {activeTab === "services" && <ServicesTab />}
    </div>
  );
}
