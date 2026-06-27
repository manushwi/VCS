ALTER TABLE gallery ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

CREATE POLICY "public_read_featured_gallery"
  ON gallery FOR SELECT TO anon
  USING (is_featured = true AND is_active = true);
