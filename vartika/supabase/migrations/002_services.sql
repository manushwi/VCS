CREATE TABLE services (
  id           UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  slug         VARCHAR(50)   UNIQUE NOT NULL,
  name         VARCHAR(100)  NOT NULL,
  tagline      VARCHAR(200),
  description  TEXT,
  what_included TEXT[],
  process_steps JSONB,
  duration_hrs  VARCHAR(50),
  icon         VARCHAR(50),
  image_url    TEXT,
  is_active    BOOLEAN       DEFAULT TRUE,
  sort_order   INTEGER       DEFAULT 0,
  created_at   TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_services" ON services FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "admin_all_services" ON services FOR ALL TO authenticated USING (true);
