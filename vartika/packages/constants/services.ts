export const SERVICES = [
  { slug: "home-cleaning", name: "Home Cleaning", icon: "🏠", price: "₹1,499+" },
  { slug: "deep-cleaning", name: "Deep Cleaning", icon: "✨", price: "₹2,999+" },
  { slug: "sofa-cleaning", name: "Sofa Cleaning", icon: "🛋", price: "₹899+" },
  { slug: "kitchen-cleaning", name: "Kitchen Cleaning", icon: "🍳", price: "₹1,299+" },
  { slug: "bathroom-cleaning", name: "Bathroom Cleaning", icon: "🚿", price: "₹799+" },
  { slug: "office-cleaning", name: "Office Cleaning", icon: "🏢", price: "₹3,499+" },
  { slug: "commercial-cleaning", name: "Commercial Cleaning", icon: "🏗", price: "₹5,999+" },
  { slug: "move-in-out", name: "Move-In/Out", icon: "🔑", price: "₹3,999+" },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
