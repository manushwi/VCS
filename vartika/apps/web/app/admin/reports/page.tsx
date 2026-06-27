import { createServerSupabase } from "@/lib/supabase/server";

export default async function AdminReportsPage() {
  const supabase = await createServerSupabase();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: true });

  const { data: services } = await supabase
    .from("services")
    .select("slug, name")
    .eq("is_active", true);

  const svcMap = new Map((services || []).map((s) => [s.slug, s.name]));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlyCounts = new Array(12).fill(0);
  (bookings || []).forEach((b) => {
    const d = new Date(b.created_at);
    monthlyCounts[d.getMonth()]++;
  });
  const maxMonthly = Math.max(...monthlyCounts, 1);

  const svcCounts: Record<string, number> = {};
  (bookings || []).forEach((b) => {
    svcCounts[b.service_slug] = (svcCounts[b.service_slug] || 0) + 1;
  });
  const totalBookings = (bookings || []).length;
  const svcPct = Object.entries(svcCounts)
    .map(([slug, count]) => ({
      name: svcMap.get(slug) || slug,
      pct: Math.round((count / totalBookings) * 100),
    }))
    .sort((a, b) => b.pct - a.pct);

  return (
    <div>
      <h2 className="text-lg font-semibold text-white/85 mb-5">Reports</h2>

      {totalBookings === 0 ? (
        <div className="text-center py-16 text-white/20 text-sm">
          No booking data yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div className="bg-[#161714] border border-white/6 rounded-12 p-6">
            <h3 className="text-sm font-medium text-white/65 mb-4">
              Bookings by Month ({totalBookings} total)
            </h3>
            <div className="flex items-end gap-3 h-[160px] pt-2">
              {monthlyCounts.map((h, i) => {
                const pct = Math.max((h / maxMonthly) * 100, h > 0 ? 8 : 0);
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t-[3px] relative bg-accent/30 hover:bg-accent/50 transition-all"
                    style={{ height: `${pct}%` }}
                    title={`${months[i]}: ${h} bookings`}
                  >
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/25 whitespace-nowrap">
                      {months[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-[#161714] border border-white/6 rounded-12 p-6">
            <h3 className="text-sm font-medium text-white/65 mb-4">
              Bookings by Service
            </h3>
            {svcPct.length === 0 ? (
              <p className="text-white/20 text-sm">No data</p>
            ) : (
              svcPct.map((svc) => (
                <div key={svc.name} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/50">{svc.name}</span>
                    <span className="text-white/30">{svc.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${svc.pct}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
