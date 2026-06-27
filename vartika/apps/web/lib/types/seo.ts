export interface SeoSettingsRow {
  id: string;
  page_slug: string;
  slug: string | null;
  meta_title: string | null;
  meta_desc: string | null;
  og_image: string | null;
  keywords: string[] | null;
  focus_keywords: string[] | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  no_index: boolean;
  no_follow: boolean;
  schema_type: string | null;
  updated_at: string;
}

export interface ServiceSeoRow {
  id: string;
  service_id: string;
  seo_title: string | null;
  seo_description: string | null;
  keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  faqs: FaqItem[];
  schema_json: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface LocationSeoRow {
  id: string;
  location: string;
  service_id: string | null;
  slug: string;
  seo_title: string | null;
  seo_description: string | null;
  keywords: string[] | null;
  faqs: FaqItem[];
  schema_json: Record<string, unknown>;
  content: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalBusinessRow {
  id: string;
  business_name: string;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  coordinates: { lat: number; lng: number } | null;
  google_maps_url: string | null;
  business_hours: BusinessHour[];
  updated_at: string;
}

export interface RedirectRow {
  id: string;
  source: string;
  destination: string;
  status_code: number;
  is_active: boolean;
  created_at: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BusinessHour {
  day: string;
  open: string;
  close: string;
}

export const BUSINESS_DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export const LOCATIONS = [
  "Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad",
];

export const SCHEMA_TYPES = [
  "LocalBusiness",
  "FAQ",
  "Service",
  "Breadcrumb",
  "Organization",
  "Product",
  "Article",
];

export const SEO_PAGES = [
  { page_slug: "home", label: "Home" },
  { page_slug: "about", label: "About" },
  { page_slug: "services", label: "Services" },
  { page_slug: "gallery", label: "Gallery" },
  { page_slug: "book", label: "Book" },
  { page_slug: "contact", label: "Contact" },
];
