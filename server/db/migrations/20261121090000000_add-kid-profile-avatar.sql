-- Up Migration

-- The name of one of the app's cartoon villagers. The server checks the shape only.
-- Rows that already exist get 'Finn', which the app can draw.
ALTER TABLE kid_profile
  ADD COLUMN avatar text NOT NULL DEFAULT 'Finn'
  CHECK (char_length(avatar) BETWEEN 1 AND 32);

-- Down Migration

ALTER TABLE kid_profile DROP COLUMN avatar;
