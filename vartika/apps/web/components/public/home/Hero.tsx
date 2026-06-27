import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-top justify-center overflow-hidden px-0">
      <Image
        src="/main2.png"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="flex flex-col mt-20 justify-start items-center text-center max-w-4xl z-10 relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#f4faf7] border border-[#e2f1ea] text-[#1b4332] text-xs font-semibold rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332]" />
          Premium Architectural Care
        </div>

        {/* Heading */}
        <h1 className="font-sans text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold tracking-tight text-[#1b4332] leading-[1.1] mb-6">
          Bringing Back the <span className="font-serif italic font-normal text-[#2d6a4f] bg-gradient-to-r from-[#2d6a4f] to-[#52b788] bg-clip-text text-transparent">Shine</span> to <br className="hidden md:inline" /> Your Spaces
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base leading-relaxed text-accent font-semibold max-w-2xl mb-12">
          Professional Marble Polishing, Facade Cleaning, Carpet Cleaning, Wooden Floor Polishing &amp; Sofa Deep Cleaning Services.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#1b4332] hover:bg-[#153527] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-sm transition-all hover:-translate-y-0.5"
          >
            Book Now
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50/50 text-[#1b4332] px-8 py-3.5 rounded-full text-sm font-medium tracking-wide border border-[#d0ded7] hover:border-[#1b4332] transition-all hover:-translate-y-0.5"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
}
