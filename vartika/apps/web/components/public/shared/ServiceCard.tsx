"use client";

import type { Service } from "@/lib/constants/services";

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

      <div className="absolute left-3 top-3 flex size-10 items-center justify-center rounded-full bg-white/90 shadow-md text-2xl">
        {service.icon}
      </div>

      <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-md">
        {priceLabel}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-7 pb-6 max-md:p-5">
        <h3 className="font-heading text-[22px] font-normal text-white mb-1.5 leading-tight max-md:text-lg">
          {service.name}
        </h3>
        <p className="text-sm text-white/65 leading-relaxed mb-3.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          {service.tagline}
        </p>
        <span className="text-xs tracking-widest uppercase text-accent3 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Explore →
        </span>
      </div>
    </div>
  );
}
