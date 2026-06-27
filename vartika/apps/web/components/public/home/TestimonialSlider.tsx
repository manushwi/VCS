const testimonials = {
  big: {
    text: "Vartika transformed our villa completely. The marble floors look like they were installed yesterday. Their team was punctual, professional, and left no trace except absolute cleanliness.",
    name: "Priya Malhotra",
    city: "DLF Phase 3, Gurgaon",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80&q=80",
  },
  small: [
    {
      text: "Booked the deep cleaning package for my 4BHK before Diwali. Every surface sparkled. Will use Vartika every season from now on.",
      name: "Rohit Kapoor",
      city: "Sector 137, Noida",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80&q=80",
    },
    {
      text: "Our office required post-renovation cleaning on short notice. Vartika delivered a spotless space in 8 hours. Truly impressive work ethic.",
      name: "Ankit Sharma",
      city: "Connaught Place, Delhi",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=520&q=80",
    },
  ],
};

import Image from "next/image";

export default function TestimonialSlider() {
  return (
    <section className="bg-bg px-12 py-[120px] max-md:px-5 max-md:py-20">
      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <div>
          <div className="section-eyebrow">Client Stories</div>
          <h2 className="section-title">
            Trusted by<br />
            <em>thousands.</em>
          </h2>
        </div>
        <p className="section-sub">
          Real experiences from real clients across Delhi NCR.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-5 max-md:grid-cols-1">
        {/* Big testimonial */}
        <div className="bg-accent-500 rounded-24 p-13 relative overflow-hidden max-md:p-8 p-8">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=60"
              alt=""
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-accent/70" />
          </div>
          <div className="relative z-[1] ">
            <div className="text-white/85 text-sm tracking-wider mb-1">
              ★★★★★
            </div>
            <div className="font-serif text-[80px] text-white/30 leading-[0.6] mb-5">
              &ldquo;
            </div>
            <p className="font-serif text-[clamp(18px,2vw,24px)] text-white leading-relaxed italic font-normal mb-8">
              {testimonials.big.text}
            </p>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shrink-0 relative">
                <Image
                  src={testimonials.big.avatar}
                  alt={testimonials.big.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {testimonials.big.name}
                </div>
                <div className="text-sm text-white/60">
                  {testimonials.big.city}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small testimonials */}
        <div className="flex flex-col gap-5">
          {testimonials.small.map((t, i) => (
            <div
              key={i}
              className="bg-bg2 rounded-16 p-8 border border-bd hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="text-warm text-sm tracking-wider mb-1">
                ★★★★★
              </div>
              <div className="font-serif text-5xl text-accent3 mb-2.5 leading-[0.6]">
                &ldquo;
              </div>
              <p className="font-serif text-[16px] italic text-ink2 leading-relaxed mb-5">
                {t.text}
              </p>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-bd shrink-0 relative">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" loading="lazy" sizes="48px" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-ink3">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
