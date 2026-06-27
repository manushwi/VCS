import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageSlug: "about" });
}

export default function AboutPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="h-[80vh] relative flex items-end px-12 pb-20 max-md:px-5">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
            alt="About Vartika"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </div>
        <div className="relative z-[1] max-w-[700px]">
          <div className="section-eyebrow" style={{ color: "var(--color-accent3)" }}>
            Our Story
          </div>
          <h1 className="section-title text-white">
            Built on the belief that<br />
            <em>every space deserves perfection.</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-[1100px] mx-auto px-12 py-[100px] max-md:px-5 max-md:py-16">
        <div className="grid grid-cols-[1fr_1fr] gap-20 items-center mb-20 max-md:grid-cols-1 max-md:gap-10">
          <div className="rounded-24 overflow-hidden aspect-[4/5] shadow-xl relative">
            <Image
              src="https://res.cloudinary.com/abh95i2u/image/upload/v1782415274/wi7owc8zeki9j3zfws7m.jpg"
              alt="Founder"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="section-eyebrow">The Beginning</div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink mb-5 leading-tight">
              A standard,<br />
              not just a <em className="italic text-accent">service.</em>
            </h2>
            <p className="section-sub max-w-none">
              Vartika Cleaning Solutions was founded in 2019 with a simple conviction: the cleaning
              industry deserved to be elevated. Not just cleaner spaces, but a
              premium experience — from first contact to final result.
            </p>
            <p className="text-[16px] text-ink3 leading-relaxed mt-5">
              Today we serve over 2,500 homes and businesses across Delhi NCR,
              employing a certified team of professionals who share our
              obsession with quality and care.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-20 items-center max-md:grid-cols-1 max-md:gap-10" dir="rtl">
          <div className="rounded-24 overflow-hidden aspect-[4/5] shadow-xl relative" dir="ltr">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
              alt="Our Work"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div dir="ltr">
            <div className="section-eyebrow">Our Mission</div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-normal text-ink mb-5 leading-tight">
              Spaces that feel<br />
              <em className="italic text-accent">alive again.</em>
            </h2>
            <p className="section-sub max-w-none">
              We believe a truly clean space changes how you feel in it — more
              relaxed, more productive, more at home. That transformation is
              what drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg2 px-12 py-20 max-md:px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-eyebrow">What We Stand For</div>
          <h2 className="section-title">
            Our values shape<br />
            every <em>visit.</em>
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-12 max-md:grid-cols-1">
            {[
              { num: "01", title: "Precision", desc: "No corner is overlooked. No surface is rushed. We approach every task with methodical attention to detail." },
              { num: "02", title: "Integrity", desc: "Transparent pricing, honest communication, and complete respect for your home and privacy." },
              { num: "03", title: "Sustainability", desc: "Eco-certified products and responsible methods that are kind to your family and the planet." },
              { num: "04", title: "Excellence", desc: "We don't just meet expectations. We exceed them — every time, for every client." },
              { num: "05", title: "Care", desc: "We treat your space as if it were our own home — with respect, thoroughness, and genuine pride." },
              { num: "06", title: "Community", desc: "We invest in our team's wellbeing, training, and growth — because great work comes from happy people." },
            ].map((v) => (
              <div
                key={v.num}
                className="bg-bg rounded-16 p-9 border border-bd hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="font-mono text-[11px] text-accent tracking-wider mb-3.5">
                  {v.num}
                </div>
                <div className="font-serif text-[22px] text-ink mb-2.5 font-normal">
                  {v.title}
                </div>
                <p className="text-sm text-ink3 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA */}
      {/* <section className="text-center px-12 py-20 bg-bg2  max-md:px-5">
        <div className="section-eyebrow">Ready to experience Vartika?</div>
        <h2 className="section-title" style={{ margin: "12px" }}>
          Book your first <em>cleaning.</em>
        </h2>
        <Link
          href="/book"
          className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
        >
          Book Now
        </Link>
      </section> */}
    </div>
  );
}
