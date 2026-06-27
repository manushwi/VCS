"use client";

import { useEffect, useState } from "react";

interface BrandLogo {
  publicId: string;
  url: string;
  caption: string;
}

export default function LogoMarquee() {
  const [logos, setLogos] = useState<BrandLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brand-logos")
      .then((res) => res.json())
      .then((data) => {
        setLogos(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-10 border-y border-neutral-200">
      <div className="relative">
        {logos.length > 0 && (
          <div className="flex animate-[marquee_40s_linear_infinite] gap-16 w-max">
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="w-36 h-16 flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.url}
                  alt={logo.caption || "brand"}
                  className="max-h-14 max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
