"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Hero() {
  return (
    <div className="min-h-screen relative w-full flex items-end justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="hidden md:block absolute inset-0 h-full w-full"
          style={{
            backgroundImage: 'url("/main14.svg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="block md:hidden absolute inset-0 h-full w-full"
          style={{
            backgroundImage: 'url("/main-mobile.svg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Aurora effect - blends over the background image */}
      <AuroraBackground
        className="absolute inset-0 z-[1] !min-h-0 !bg-transparent dark:!bg-transparent pointer-events-none"
        showRadialGradient={false}
      >
        <div />
      </AuroraBackground>

      {/* Overlay + content */}
      <div className="absolute inset-0 bg-black/10 z-10 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="z-20 w-full flex items-center justify-center text-center px-6 pb-28"
        >
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#f4faf7] border border-[#e2f1ea] text-[#1b4332] text-xs font-semibold rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b4332]" />
          Premium Architectural Care
        </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl text-[#0A0908]/70 font-bold leading-tight">
              Bringing Back the Shine{" "}
              <br className="hidden md:block" />
              to Your Spaces
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#0A0908]/70">
              Marble Polishing, Facade, Carpet & <br />
              Sofa Cleaning Services
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
              >
                Book Cleaning Now
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-transparent text-[#0A0908]/80 px-8 py-4 rounded-full text-sm font-medium tracking-wide border border-[#0A0908]/20 hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
