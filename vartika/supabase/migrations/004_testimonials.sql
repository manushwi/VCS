CREATE TABLE testimonials (
  id           UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  city         VARCHAR(100),
  service_slug VARCHAR(50),
  review       TEXT         NOT NULL,
  rating       INTEGER      CHECK (rating BETWEEN 1 AND 5),
  is_active    BOOLEAN      DEFAULT TRUE,
  created_at   TIMESTAMPTZ  DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "admin_all_testimonials" ON testimonials FOR ALL TO authenticated USING (true);
