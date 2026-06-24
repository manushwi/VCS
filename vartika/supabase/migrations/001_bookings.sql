CREATE TABLE bookings (
  id             UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name  VARCHAR(100)  NOT NULL,
  phone          VARCHAR(20)   NOT NULL,
  whatsapp       VARCHAR(20),
  email          VARCHAR(100),
  service_slug   VARCHAR(50)   NOT NULL,
  property_type  VARCHAR(20)   CHECK (property_type IN ('home','office','commercial')),
  area_sqft      INTEGER,
  preferred_date DATE          NOT NULL,
  time_slot      VARCHAR(20)   CHECK (time_slot IN ('morning','afternoon','evening')),
  city           VARCHAR(100)  NOT NULL,
  notes          TEXT,
  source         VARCHAR(20)   DEFAULT 'other'
                               CHECK (source IN ('google','whatsapp','friend','social','other')),
  status         VARCHAR(20)   DEFAULT 'new'
                               CHECK (status IN ('new','contacted','confirmed','completed','cancelled')),
  admin_notes    TEXT,
  created_at     TIMESTAMPTZ   DEFAULT NOW(),
  updated_at     TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "admin_all_bookings" ON bookings FOR ALL TO authenticated USING (true);
