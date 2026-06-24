export default function AdminReportsPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white/85 mb-5">Reports</h2>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        <div className="bg-[#161714] border border-white/6 rounded-12 p-6">
          <h3 className="text-sm font-medium text-white/65 mb-4">
            Bookings by Month
          </h3>
          <div className="flex items-end gap-3 h-[160px] pt-2">
            {[20, 35, 28, 45, 38, 55, 48, 62, 52, 70, 58, 75].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[3px] bg-accent/30 hover:bg-accent/50 transition-all"
                  style={{ height: `${h}%` }}
                >
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-white/25 whitespace-nowrap">
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][i]}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="bg-[#161714] border border-white/6 rounded-12 p-6">
          <h3 className="text-sm font-medium text-white/65 mb-4">
            Revenue by Service
          </h3>
          {[
            { name: "Deep Cleaning", pct: 32 },
            { name: "Home Cleaning", pct: 24 },
            { name: "Office Cleaning", pct: 18 },
            { name: "Sofa Cleaning", pct: 12 },
            { name: "Others", pct: 14 },
          ].map((svc) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
