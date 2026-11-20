-- Up Migration

-- Tables of the login library (Better Auth, default names and camelCase columns).
-- Better Auth's own migrate tool is not used: this folder is the one migration path.
-- The test in server/auth.test.ts checks these columns against what the library expects.

CREATE TABLE "user" (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL,
  image text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE session (
  id text PRIMARY KEY,
  "expiresAt" timestamptz NOT NULL,
  token text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE INDEX session_user_id_idx ON session ("userId");

CREATE TABLE account (
  id text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user" (id) ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX account_user_id_idx ON account ("userId");

CREATE TABLE verification (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX verification_identifier_idx ON verification (identifier);

-- The Parent account of a family is a row in "user". Deleting the user deletes the family
-- (and with it the kid profiles and subscription).
ALTER TABLE family
  ADD CONSTRAINT family_parent_user_id_fkey
  FOREIGN KEY (parent_user_id) REFERENCES "user" (id) ON DELETE CASCADE;

-- Down Migration

ALTER TABLE family DROP CONSTRAINT family_parent_user_id_fkey;
DROP TABLE verification;
DROP TABLE account;
DROP TABLE session;
DROP TABLE "user";
