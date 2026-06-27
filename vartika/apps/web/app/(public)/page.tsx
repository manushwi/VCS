import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "@/components/public/home/Hero";
import MarqueeBar from "@/components/public/home/MarqueeBar";
import StatsSection from "@/components/public/home/StatsSection";
import Transformation from "@/components/public/home/Transformation";
import ServicesGrid from "@/components/public/home/ServicesGrid";
import GalleryPreview from "@/components/public/home/GalleryPreview";
import WhyChooseUs from "@/components/public/home/WhyChooseUs";
import TestimonialSlider from "@/components/public/home/TestimonialSlider";
import LogoMarquee from "@/components/public/home/LogoMarquee";
import CTABanner from "@/components/public/home/CTABanner";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageSlug: "home" });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <StatsSection />
      <Transformation />
      <ServicesGrid />
      <GalleryPreview />
      <WhyChooseUs />
      <TestimonialSlider />
      <LogoMarquee />
      <CTABanner />
    </>
  );
}
