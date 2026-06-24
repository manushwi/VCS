"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-12 pt-[100px] pb-15 gap-15 overflow-hidden bg-bg max-md:flex-col max-md:px-5 max-md:pt-20 max-md:pb-10 max-md:gap-10">
      <div className="flex-[0_0_52%] max-w-[52%] max-md:max-w-full max-md:flex-none">
        <div className="flex items-center gap-2.5 mb-6 text-[11px] tracking-widest uppercase text-accent font-medium before:w-7 before:h-px before:bg-accent">
          Premium Cleaning Services
        </div>
        <h1 className="font-serif text-[clamp(60px,7.5vw,96px)] font-light leading-[1.02] tracking-tight text-ink mb-6">
          Spaces Worth<br />
          <em className="italic text-accent not-italic">Living In.</em>
        </h1>
        <p className="text-[17px] text-ink3 leading-relaxed max-w-[460px] mb-11">
          Professional cleaning and restoration services designed for modern
          homes and businesses across Delhi NCR.
        </p>
        <div className="flex gap-3.5 flex-wrap mb-13">
          <Link
            href="/book"
            className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
          >
            Book Cleaning
          </Link>
          <Link
            href="/#services"
            className="btn inline-flex items-center gap-2 bg-transparent text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-bd2 hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all"
          >
            Explore Services
          </Link>
        </div>
        <div className="flex gap-8 flex-wrap">
          {[
            { label: "Spaces Transformed", value: "2,500+" },
            { label: "Satisfaction Rate", value: "98%" },
            { label: "Eco-Friendly Products", value: "" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-ink3">
              <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
              {item.value && `${item.value} `}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative min-h-[600px] max-md:h-[380px] max-md:min-h-[380px]">
        <div className="relative w-full h-full min-h-[600px] max-md:min-h-[380px]">
          {[
            { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80", className: "w-[200px] h-[260px] top-[2%] left-[8%] -rotate-[4deg] animate-[flt1_7s_ease-in-out_infinite]" },
            { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=340&h=440&q=80", className: "w-[170px] h-[220px] top-[8%] left-[50%] rotate-[3.5deg] animate-[flt2_8s_ease-in-out_infinite_0.8s] z-[2]" },
            { src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=480&h=340&q=80", className: "w-[240px] h-[180px] top-[35%] left-0 rotate-[1.5deg] animate-[flt1_9s_ease-in-out_infinite_1.2s]" },
            { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=380&q=80", className: "w-[190px] h-[240px] top-[38%] left-[44%] -rotate-[2deg] animate-[flt2_7s_ease-in-out_infinite_0.4s] z-[3]" },
            { src: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=320&q=80", className: "w-[160px] h-[180px] top-[72%] left-[18%] rotate-[4deg] animate-[flt1_8s_ease-in-out_infinite_1.8s]" },
          ].map((img, i) => (
            <div
              key={i}
              className={`absolute rounded-16 overflow-hidden shadow-lg ${img.className}`}
            >
              <img src={img.src} alt="" loading={i < 2 ? "eager" : "lazy"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
