CREATE TABLE seo_settings (
  id          UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug   VARCHAR(100) UNIQUE NOT NULL,
  meta_title  VARCHAR(60),
  meta_desc   VARCHAR(160),
  og_image    TEXT,
  keywords    TEXT[],
  updated_at  TIMESTAMPTZ  DEFAULT NOW()
);

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_seo" ON seo_settings FOR ALL TO authenticated USING (true);
