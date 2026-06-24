"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: "<svg viewBox='0 0 24 24'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/></svg>",
      },
      {
        label: "Bookings",
        href: "/admin/bookings",
        icon: "<svg viewBox='0 0 24 24'><rect x='3' y='4' width='18' height='18' rx='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/></svg>",
        badge: 5,
      },
      {
        label: "Services",
        href: "/admin/services",
        icon: "<svg viewBox='0 0 24 24'><path d='M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z'/></svg>",
      },
      {
        label: "Gallery",
        href: "/admin/gallery",
        icon: "<svg viewBox='0 0 24 24'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/></svg>",
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: "<svg viewBox='0 0 24 24'><path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'/></svg>",
      },
    ],
  },
  {
    section: "Analytics",
    items: [
      {
        label: "Reports",
        href: "/admin/reports",
        icon: "<svg viewBox='0 0 24 24'><line x1='18' y1='20' x2='18' y2='10'/><line x1='12' y1='20' x2='12' y2='4'/><line x1='6' y1='20' x2='6' y2='14'/></svg>",
      },
      {
        label: "SEO",
        href: "/admin/seo",
        icon: "<svg viewBox='0 0 24 24'><circle cx='11' cy='11' r='8'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>",
      },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#0C0D0B] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#111210] border-r border-white/5 flex flex-col shrink-0 overflow-y-auto max-md:hidden">
        <div className="px-6 py-6 border-b border-white/5">
          <img src="/logo.svg" alt="Vartika" className="h-8 w-auto object-contain" />
        </div>

        {navItems.map((group) => (
          <div key={group.section}>
            <div className="text-[9px] tracking-widest uppercase text-white/20 px-5 pt-5 pb-1.5 font-semibold">
              {group.section}
            </div>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 h-10 px-4 mx-2.5 my-0.5 rounded-8 cursor-pointer transition-all text-sm ${
                    active
                      ? "text-accent2 bg-[rgba(61,89,72,0.12)] border-l-2 border-accent2"
                      : "text-white/40 hover:text-white/85 hover:bg-white/4"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 shrink-0"
                    dangerouslySetInnerHTML={{
                      __html: item.icon.replace(
                        /<svg/g,
                        '<svg stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"'
                      ),
                    }}
                  />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-accent text-white text-[10px] font-bold px-[7px] py-[1px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="mt-auto p-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 p-2.5 rounded-8 bg-white/4 border border-white/5 cursor-pointer"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              A
            </div>
            <span className="text-sm text-white/65 flex-1">Admin</span>
            <span className="text-sm text-white/20">↗</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {/* Topbar */}
        <div className="h-15 bg-[rgba(12,13,11,0.95)] backdrop-blur-[12px] border-b border-white/5 flex items-center justify-between px-7 shrink-0 sticky top-0 z-10">
          <span className="text-sm font-medium text-white/85">Admin</span>
          <div className="flex items-center gap-3">
            <input
              className="h-[34px] w-[220px] bg-white/5 border border-white/6 rounded-8 px-3 text-sm text-white/60 outline-none placeholder:text-white/20"
              placeholder="Search bookings..."
            />
            <div className="text-lg text-white/40 relative cursor-pointer">
              🔔
              <div className="absolute top-0 -right-px w-[6px] h-[6px] bg-accent rounded-full" />
            </div>
            <span className="font-mono text-[11px] text-white/20">
              Tue, 24 Jun 2025
            </span>
          </div>
        </div>

        <div className="p-7 flex-1">{children}</div>
      </div>
    </div>
  );
}
