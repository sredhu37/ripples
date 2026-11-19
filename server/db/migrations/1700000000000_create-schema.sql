-- Up Migration

CREATE TABLE family (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  free_month_ends_at timestamptz NOT NULL,
  -- Id of the Parent account in the login library's user table (#215 adds the foreign key).
  -- One login per family: unique.
  parent_user_id text UNIQUE
);

CREATE TABLE kid_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES family (id) ON DELETE CASCADE,
  -- Same cleaning as cleanName in src/progress.ts: trimmed, single spaces, 20 characters at most.
  nickname text NOT NULL CHECK (char_length(nickname) <= 20),
  lang text NOT NULL DEFAULT 'en' CHECK (lang IN ('en', 'de', 'pl')),
  muted boolean NOT NULL DEFAULT false,
  badges text[] NOT NULL DEFAULT '{}',
  disabled_lessons text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX kid_profile_family_id_idx ON kid_profile (family_id);

CREATE TABLE subscription (
  family_id uuid PRIMARY KEY REFERENCES family (id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('stripe')),
  provider_customer_id text NOT NULL,
  provider_subscription_id text NOT NULL,
  status text NOT NULL,
  current_period_end timestamptz NOT NULL,
  UNIQUE (provider, provider_subscription_id)
);

-- Down Migration

DROP TABLE subscription;
DROP TABLE kid_profile;
DROP TABLE family;
