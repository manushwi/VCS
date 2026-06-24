CREATE TABLE gallery (
  id            UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  cloudinary_id VARCHAR(200) NOT NULL,
  image_url     TEXT         NOT NULL,
  caption       VARCHAR(200),
  service_slug  VARCHAR(50),
  type          VARCHAR(10)  DEFAULT 'general'
                             CHECK (type IN ('before','after','general')),
  sort_order    INTEGER      DEFAULT 0,
  is_active     BOOLEAN      DEFAULT TRUE,
  created_at    TIMESTAMPTZ  DEFAULT NOW()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_gallery" ON gallery FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "admin_all_gallery" ON gallery FOR ALL TO authenticated USING (true);
