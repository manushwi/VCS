"use client";

const pages = [
  { slug: "home", title: "Home", metaTitle: "Vartika Cleaning Solutions — Spaces Worth Living In", metaDesc: "Premium cleaning and restoration services for modern homes and businesses across Delhi NCR." },
  { slug: "gallery", title: "Gallery", metaTitle: "Before & After — Vartika Cleaning Gallery", metaDesc: "Real transformations from across Delhi NCR." },
  { slug: "about", title: "About", metaTitle: "About Vartika — Our Story & Values", metaDesc: "Learn about the team behind every spotless space." },
  { slug: "book", title: "Booking", metaTitle: "Book a Cleaning — Vartika Cleaning Solutions", metaDesc: "Fill in a few details. We'll confirm within 2 hours." },
  { slug: "contact", title: "Contact", metaTitle: "Contact Us — Vartika Cleaning Solutions", metaDesc: "Get in touch for a free quote or inquiry." },
];

export default function AdminSeoPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white/85 mb-5">SEO Settings</h2>
      <div className="bg-[#161714] border border-white/6 rounded-12 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/4">
              {["Page", "Meta Title", "Meta Description", "Actions"].map((h) => (
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
            {pages.map((page) => (
              <tr
                key={page.slug}
                className="border-b border-white/3 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-3.5 text-sm text-white/75 font-medium">
                  {page.title}
                </td>
                <td className="text-sm text-white/50 max-w-[300px] truncate px-5">
                  {page.metaTitle}
                </td>
                <td className="text-sm text-white/35 max-w-[300px] truncate px-5">
                  {page.metaDesc}
                </td>
                <td className="px-5">
                  <span className="w-[26px] h-[26px] inline-flex items-center justify-center rounded-[5px] cursor-pointer text-white/25 hover:text-accent2 hover:bg-[rgba(61,89,72,0.12)] transition-all text-xs">
                    ✎
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
