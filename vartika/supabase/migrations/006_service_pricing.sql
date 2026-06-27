ALTER TABLE services ADD COLUMN base_price INTEGER DEFAULT 0;
ALTER TABLE services ADD COLUMN pricing_unit VARCHAR(20) DEFAULT 'sq.ft';
ALTER TABLE services ADD COLUMN pricing_model VARCHAR(20) DEFAULT 'per_sqft'
  CHECK (pricing_model IN ('per_sqft', 'per_unit'));
