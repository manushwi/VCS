"use client";

import type { Service } from "@/lib/map-service";

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export default function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const priceLabel =
    service.pricingModel === "per_sqft"
      ? `₹${service.basePrice}/${service.pricingUnit}`
      : `₹${service.basePrice}/${service.pricingUnit}`;

  return (
    <div
      className="group relative cursor-pointer rounded-16 overflow-hidden aspect-[3/4]"
      onClick={() => onSelect(service)}
    >
      <img
        src={service.image}
        alt={service.name}
        className="size-full object-cover transition-transform duration-[0.6s] ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent group-hover:from-ink/90 group-hover:via-ink/30 transition-all" />

      <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-s font-semibold text-white shadow-md">
        {priceLabel}
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pb-4">
  <div className="translate-y-[calc(100%-52px)] group-hover:translate-y-0 transition-transform duration-300 ease-out">
    <h3 className="font-heading text-[22px] font-normal text-white leading-tight px-5 max-md:text-lg mb-8">
      {service.name}
    </h3>
    <div className="px-5 pt-2 pb-4">
      <p className="text-sm text-white/65 leading-relaxed mb-3">
        {service.tagline}
      </p>
      <span className="text-xs tracking-widest uppercase text-accent3 font-medium">
        Explore →
      </span>
    </div>
  </div>
</div>
    </div>
  );
}
