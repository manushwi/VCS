"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobOpen]);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 h-[68px] z-[1000] flex items-center justify-between px-12 max-md:px-5 transition-all duration-300 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-xl shadow-[0_1px_0_rgba(24,24,22,0.08)]"
            : ""
        }`}
      >
        <Link href="/" className="pt-4 cursor-pointer">
          <img
            src="/logo-horizontal.svg"
            alt="Vartika"
            className="h-[68px] max-w-[clamp(140px,35vw,200px)] w-auto object-contain mb-0"
          />
        </Link>

        <ul className="flex gap-9 list-none max-md:hidden">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-[13px] text-ink3 tracking-wide hover:text-ink transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 max-md:hidden">
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 border border-bd2 rounded-full text-sm text-ink2 hover:border-accent hover:text-accent transition-all"
            onClick={() => window.open(`https://wa.me/${waNumber}`, "_blank")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </button>
          <Link
            href="/book"
            className="px-[22px] py-2.5 bg-accent text-white rounded-full text-[13px] font-medium tracking-wide hover:bg-accent2 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(61,89,72,0.3)] transition-all"
          >
            Book Cleaning
          </Link>
        </div>

        <button
          className="hidden max-md:flex flex-col items-center justify-center cursor-pointer p-1 w-8 h-8"
          onClick={() => setMobOpen((prev) => !prev)}
          aria-label={mobOpen ? "Close menu" : "Open menu"}
        >
          {mobOpen ? (
            <span className="text-xl text-ink leading-none">✕</span>
          ) : (
            <>
              <span className="w-5 h-[1.5px] bg-ink rounded-px transition-all" />
              <span className="w-5 h-[1.5px] bg-ink rounded-px transition-all mt-[3px]" />
              <span className="w-5 h-[1.5px] bg-ink rounded-px transition-all mt-[3px]" />
            </>
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        id="mob-nav"
        className={`fixed inset-0 bg-bg z-[997] flex flex-col items-center justify-center gap-8 ${
          mobOpen ? "flex" : "hidden"
        }`}
      >
        {[{ label: "Home", href: "/" }, ...navLinks, { label: "Book Now", href: "/book" }].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-serif text-4xl font-normal text-ink hover:text-accent transition-colors"
            onClick={() => setMobOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
