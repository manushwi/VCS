import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ServicesGrid from "@/components/public/home/ServicesGrid";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageSlug: "services" });
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg">
      <ServicesGrid />
    </div>
  );
}
