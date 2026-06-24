export interface Service {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  what_included?: string[];
  process_steps?: Record<string, unknown>;
  duration_hrs?: string;
  icon?: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}
