"use client";

import { useState } from "react";

const dummyBookings = [
  { id: "1", initials: "RK", name: "Ravi Kumar", phone: "+91 98110 22334", svc: "Floor Polish", date: "25 Jun 2025", time: "Morning", city: "Noida", status: "new" },
  { id: "2", initials: "SP", name: "Sneha Patel", phone: "+91 91234 56789", svc: "Sofa Cleaning", date: "24 Jun 2025", time: "Afternoon", city: "Delhi", status: "contacted" },
  { id: "3", initials: "AS", name: "Ankit Singh", phone: "+91 87654 32100", svc: "Deep Cleaning", date: "22 Jun 2025", time: "Morning", city: "Gurgaon", status: "confirmed" },
  { id: "4", initials: "PM", name: "Pooja Mehta", phone: "+91 99887 66554", svc: "Office Cleaning", date: "20 Jun 2025", time: "Morning", city: "Noida", status: "completed" },
  { id: "5", initials: "VK", name: "Vikram Kapoor", phone: "+91 76543 21098", svc: "Move-Out", date: "18 Jun 2025", time: "Evening", city: "Gurgaon", status: "completed" },
  { id: "6", initials: "SN", name: "Shreya Nair", phone: "+91 88776 65544", svc: "Home Cleaning", date: "27 Jun 2025", time: "Morning", city: "Delhi", status: "new" },
  { id: "7", initials: "AG", name: "Amit Gupta", phone: "+91 90909 80808", svc: "Kitchen Cleaning", date: "28 Jun 2025", time: "Afternoon", city: "Ghaziabad", status: "new" },
  { id: "8", initials: "RJ", name: "Ritu Jain", phone: "+91 77788 99900", svc: "Bathroom Cleaning", date: "26 Jun 2025", time: "Evening", city: "Faridabad", status: "contacted" },
];

const statusColors: Record<string, string> = {
  new: "bg-[rgba(200,217,200,0.08)] border-[rgba(200,217,200,0.2)] text-accent2",
  contacted: "bg-[rgba(96,165,250,0.08)] border-[rgba(96,165,250,0.2)] text-[#60A5FA]",
  confirmed: "bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)] text-[#22C55E]",
  completed: "bg-[rgba(148,163,184,0.08)] border-[rgba(148,163,184,0.2)] text-[#94A3B8]",
  cancelled: "bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)] text-[#EF4444]",
};

const filters = ["All", "New", "Contacted", "Confirmed", "Completed", "Cancelled"];

export default function AdminBookingsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? dummyBookings
    : dummyBookings.filter((b) => b.status === activeFilter.toLowerCase());

  return (
    <div>
      <h2 className="text-lg font-semibold text-white/85 mb-5">Bookings</h2>
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-full text-xs cursor-pointer transition-all ${
              activeFilter === f
                ? "bg-accent text-white"
                : "bg-white/5 text-white/40 border border-white/6 hover:text-white/70"
            }`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-white/4">
                {["Customer", "Service", "Date", "Time", "City", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-[10px] tracking-widest uppercase text-white/25 px-5 py-2.5 text-left whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/3 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                        {row.initials}
                      </div>
                      <div>
                        <span className="text-sm text-white/75 block">
                          {row.name}
                        </span>
                        <span className="text-[11px] text-white/30 block">
                          {row.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="bg-white/5 border border-white/6 rounded px-2 py-0.5 text-[11px] text-white/50">
                      {row.svc}
                    </span>
                  </td>
                  <td className="font-mono text-[11px] text-white/40 px-5">
                    {row.date}
                  </td>
                  <td className="font-mono text-[11px] text-white/40 px-5">
                    {row.time}
                  </td>
                  <td className="font-mono text-[11px] text-white/40 px-5">
                    {row.city}
                  </td>
                  <td className="px-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] border ${statusColors[row.status]}`}
                    >
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5">
                    <div className="flex gap-1">
                      <span className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs">
                        👁
                      </span>
                      <span className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs">
                        ✎
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
