"use client";

const dummyTestimonials = [
  { id: "1", name: "Priya Malhotra", city: "Gurgaon", review: "Vartika transformed our villa completely...", rating: 5, status: "active" },
  { id: "2", name: "Rohit Kapoor", city: "Noida", review: "Booked the deep cleaning package...", rating: 5, status: "active" },
  { id: "3", name: "Anita Sharma", city: "Delhi", review: "Our office required post-renovation cleaning...", rating: 5, status: "active" },
];

export default function AdminTestimonialsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white/85">Testimonials</h2>
        <button className="px-4 py-2 bg-accent text-white rounded-full text-xs font-medium hover:bg-accent2 transition-all cursor-pointer">
          + Add Testimonial
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {dummyTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#161714] border border-white/6 rounded-12 p-5"
          >
            <div className="text-[#F59E0B] text-sm tracking-wider mb-2">
              {"★".repeat(t.rating)}
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3">
              &ldquo;{t.review}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/75 font-medium">
                  {t.name}
                </div>
                <div className="text-xs text-white/35">{t.city}</div>
              </div>
              <div className="flex gap-1">
                <span className="w-7 h-7 flex items-center justify-center rounded text-white/25 cursor-pointer hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] text-xs">
                  ✎
                </span>
                <span className="w-7 h-7 flex items-center justify-center rounded text-white/25 cursor-pointer hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.12)] text-xs">
                  ✕
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
