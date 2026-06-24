"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants/services";
import ServiceCard from "@/components/public/shared/ServiceCard";
import ServiceDetailModal from "@/components/public/shared/ServiceDetailModal";
import type { Service } from "@/lib/constants/services";

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="px-12 py-[120px] bg-bg max-md:px-5 max-md:py-20"
    >
      <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
        <div>
          <div className="section-eyebrow">Our Services</div>
          <h2 className="section-title">
            Every service.<br />
            <em>Extraordinary.</em>
          </h2>
        </div>
        <p className="section-sub max-md:max-w-full">
          Five specialised cleaning services, each delivered by trained
          professionals using premium, eco-certified products.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {SERVICES.map((svc) => (
          <ServiceCard
            key={svc.slug}
            service={svc}
            onSelect={setSelectedService}
          />
        ))}
      </div>

      <ServiceDetailModal
        service={selectedService}
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
