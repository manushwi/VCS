-- Enhance seo_settings with additional columns
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS slug VARCHAR(200);
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS focus_keywords TEXT[];
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS og_title VARCHAR(60);
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS og_description VARCHAR(160);
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(60);
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS twitter_description VARCHAR(160);
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS twitter_image TEXT;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS no_index BOOLEAN DEFAULT FALSE;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS no_follow BOOLEAN DEFAULT FALSE;
ALTER TABLE seo_settings ADD COLUMN IF NOT EXISTS schema_type VARCHAR(50);

-- Allow public read for SEO metadata (used by generateMetadata)
DROP POLICY IF EXISTS "anon_select_seo_settings" ON seo_settings;
CREATE POLICY "anon_select_seo_settings" ON seo_settings FOR SELECT TO anon USING (true);

-- Service SEO: per-service metadata
CREATE TABLE IF NOT EXISTS service_seo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE UNIQUE,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  keywords TEXT[],
  og_title VARCHAR(60),
  og_description VARCHAR(160),
  og_image TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  schema_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE service_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_service_seo" ON service_seo;
CREATE POLICY "anon_select_service_seo" ON service_seo FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "admin_all_service_seo" ON service_seo;
CREATE POLICY "admin_all_service_seo" ON service_seo FOR ALL TO authenticated USING (true);

-- Location SEO: landing pages for location+service combinations
CREATE TABLE IF NOT EXISTS location_seo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  location VARCHAR(100) NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  slug VARCHAR(200) UNIQUE NOT NULL,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  keywords TEXT[],
  faqs JSONB DEFAULT '[]'::jsonb,
  schema_json JSONB DEFAULT '{}'::jsonb,
  content TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE location_seo ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_location_seo" ON location_seo;
CREATE POLICY "anon_select_location_seo" ON location_seo FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "admin_all_location_seo" ON location_seo;
CREATE POLICY "admin_all_location_seo" ON location_seo FOR ALL TO authenticated USING (true);

-- Local Business settings (single row)
CREATE TABLE IF NOT EXISTS local_business_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name VARCHAR(200) DEFAULT 'Vartika Cleaning Solutions',
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  address TEXT,
  coordinates JSONB DEFAULT '{}'::jsonb,
  google_maps_url TEXT,
  business_hours JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE local_business_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_lbs" ON local_business_settings;
CREATE POLICY "anon_select_lbs" ON local_business_settings FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "admin_all_lbs" ON local_business_settings;
CREATE POLICY "admin_all_lbs" ON local_business_settings FOR ALL TO authenticated USING (true);

-- URL Redirects
CREATE TABLE IF NOT EXISTS redirects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source VARCHAR(500) UNIQUE NOT NULL,
  destination VARCHAR(500) NOT NULL,
  status_code INTEGER DEFAULT 301,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_redirects" ON redirects;
CREATE POLICY "anon_select_redirects" ON redirects FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "admin_all_redirects" ON redirects;
CREATE POLICY "admin_all_redirects" ON redirects FOR ALL TO authenticated USING (true);
