import Hero from "@/components/public/home/Hero";
import MarqueeBar from "@/components/public/home/MarqueeBar";
import StatsSection from "@/components/public/home/StatsSection";
import Transformation from "@/components/public/home/Transformation";
import ServicesGrid from "@/components/public/home/ServicesGrid";
import GalleryPreview from "@/components/public/home/GalleryPreview";
import WhyChooseUs from "@/components/public/home/WhyChooseUs";
import TestimonialSlider from "@/components/public/home/TestimonialSlider";
import ServiceAreas from "@/components/public/home/ServiceAreas";
import CTABanner from "@/components/public/home/CTABanner";

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
      <ServiceAreas />
      <CTABanner />
    </>
  );
}
