import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5 mb-5 max-md:grid-cols-2">
        {[
          { val: "127", label: "Total Bookings", chg: "↑ +18% this month", color: "var(--color-accent2)" },
          { val: "5", label: "Pending Review", chg: "⚠ 2 urgent", color: "#F59E0B" },
          { val: "43", label: "Confirmed", chg: "This month", color: "#22C55E" },
          { val: "₹2.4L", label: "Monthly Revenue", chg: "↑ +24%", color: "var(--color-accent2)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161714] border border-white/6 rounded-12 p-[22px] relative"
          >
            <div className="font-mono text-[32px] text-white font-medium mb-1 leading-none">
              {stat.val}
            </div>
            <div className="text-xs text-white/35 uppercase tracking-wide mb-2">
              {stat.label}
            </div>
            <div className="text-[11px] flex items-center gap-1" style={{ color: stat.chg.includes("↑") ? "#22C55E" : "#F59E0B" }}>
              {stat.chg}
            </div>
          </div>
        ))}
      </div>

      {/* Main area */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-3.5 max-md:grid-cols-1">
        {/* Bookings table */}
        <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/4">
            <span className="text-sm font-semibold text-white/85">
              Recent Bookings
            </span>
            <Link href="/admin/bookings" className="text-xs text-accent2 cursor-pointer">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-white/4">
                  {["Customer", "Service", "Date", "City", "Status", ""].map(
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
                {[
                  { initials: "RK", name: "Ravi Kumar", phone: "+91 98110 22334", svc: "Floor Polish", date: "25 Jun · AM", city: "Noida", status: "New", statusClass: "st-new" },
                  { initials: "SP", name: "Sneha Patel", phone: "+91 91234 56789", svc: "Sofa Clean", date: "24 Jun · PM", city: "Delhi", status: "Contacted", statusClass: "st-cont" },
                  { initials: "AS", name: "Ankit Singh", phone: "+91 87654 32100", svc: "Deep Clean", date: "22 Jun · AM", city: "Gurgaon", status: "Confirmed", statusClass: "st-conf" },
                  { initials: "PM", name: "Pooja Mehta", phone: "+91 99887 66554", svc: "Office Clean", date: "20 Jun · AM", city: "Noida", status: "Completed", statusClass: "st-done" },
                  { initials: "VK", name: "Vikram Kapoor", phone: "+91 76543 21098", svc: "Move-Out", date: "18 Jun · EV", city: "Gurgaon", status: "Completed", statusClass: "st-done" },
                ].map((row, i) => (
                  <tr
                    key={i}
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
                      {row.city}
                    </td>
                    <td className="px-5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] ${
                          row.status === "New"
                            ? "bg-[rgba(200,217,200,0.08)] border border-[rgba(200,217,200,0.2)] text-accent2"
                            : row.status === "Contacted"
                            ? "bg-[rgba(96,165,250,0.08)] border border-[rgba(96,165,250,0.2)] text-[#60A5FA]"
                            : row.status === "Confirmed"
                            ? "bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.2)] text-[#22C55E]"
                            : "bg-[rgba(148,163,184,0.08)] border border-[rgba(148,163,184,0.2)] text-[#94A3B8]"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5">
                      <span className="text-xs text-white/25 cursor-pointer hover:text-accent2">👁</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3.5">
          {/* Revenue chart */}
          <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/4">
              <span className="text-sm font-semibold text-white/85">
                Revenue (6 months)
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-end gap-2 h-[120px] pt-2">
                {[55, 70, 48, 80, 65, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[3px] cursor-pointer hover:opacity-80 transition-opacity relative"
                    style={{
                      height: `${h}%`,
                      background:
                        i === 5
                          ? "var(--color-accent)"
                          : "rgba(200,217,200,0.2)",
                    }}
                  >
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/25 whitespace-nowrap">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 mt-6" />
            </div>
          </div>

          {/* WhatsApp templates */}
          <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/4">
              <span className="text-sm font-semibold text-white/85">
                WhatsApp Templates
              </span>
            </div>
            <div className="p-4">
              {[
                { title: "📋 Booking Received", prev: "Hi [Name], thank you for booking with Vartika..." },
                { title: "✅ Appointment Confirmed", prev: "Your [Service] is confirmed for [Date]..." },
                { title: "⭐ Request Review", prev: "Hi [Name], we hope your space feels wonderful..." },
              ].map((tpl) => (
                <div
                  key={tpl.title}
                  className="bg-black/20 border border-white/4 rounded-8 p-3.5 mb-2 cursor-pointer hover:border-[rgba(37,211,102,0.2)] transition-all"
                >
                  <div className="text-xs text-white/65 font-medium mb-1 flex items-center gap-1.5">
                    {tpl.title}
                  </div>
                  <div className="text-[11px] text-white/25 overflow-hidden whitespace-nowrap text-ellipsis">
                    {tpl.prev}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
