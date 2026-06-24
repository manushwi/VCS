"use client";

const areas = [
  {
    name: "Delhi",
    sub: "All areas including South Delhi, Central, Dwarka",
    badge: "Active",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Noida",
    sub: "All sectors, Greater Noida, Noida Extension",
    badge: "Active",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Gurgaon",
    sub: "DLF, Sohna Road, Golf Course Road",
    badge: "Active",
    img: "https://images.unsplash.com/photo-1604956247783-cdb19bc1a553?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Faridabad",
    sub: "NIT, Sector 15, Ballabhgarh",
    badge: "Active",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Ghaziabad",
    sub: "Indirapuram, Raj Nagar Extension",
    badge: "Active",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=600&h=280&q=80",
  },
  {
    name: "Greater Noida",
    sub: "Knowledge Park, Techzone, Omega",
    badge: "Expanding",
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&h=280&q=80",
  },
];

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-bg2 px-12 py-[100px] max-md:px-5 max-md:py-16">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-eyebrow">Where We Serve</div>
          <h2 className="section-title">
            Delhi NCR &amp;<br />
            <em>beyond.</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
          {areas.map((area, i) => (
            <div
              key={area.name}
              className="bg-bg rounded-16 overflow-hidden border border-bd hover:border-accent hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={area.img}
                  alt={area.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-6 py-5">
                <div className="font-serif text-[22px] font-normal text-ink mb-1">
                  {area.name}
                </div>
                <div className="text-sm text-ink3">{area.sub}</div>
                <span className="inline-block text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-[rgba(61,89,72,0.07)] text-accent mt-2">
                  {area.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
