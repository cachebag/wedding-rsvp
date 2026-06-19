import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));
loadEnvFile(resolve(process.cwd(), ".env"));

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS rsvps (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      attending TEXT NOT NULL,
      plus_first_name TEXT,
      plus_last_name TEXT,
      guests_json TEXT,
      traveling_from TEXT,
      dietary TEXT,
      message TEXT,
      event TEXT NOT NULL DEFAULT 'auburn',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'rsvps' AND column_name = 'event'
      ) THEN
        ALTER TABLE rsvps ADD COLUMN event TEXT NOT NULL DEFAULT 'auburn';
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'rsvps' AND column_name = 'traveling_from'
      ) THEN
        ALTER TABLE rsvps ADD COLUMN traveling_from TEXT;
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'rsvps' AND column_name = 'guests_json'
      ) THEN
        ALTER TABLE rsvps ADD COLUMN guests_json TEXT;
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'rsvps' AND column_name = 'phone'
      ) THEN
        ALTER TABLE rsvps ADD COLUMN phone TEXT;
      END IF;
      -- make email nullable if it isn't already
      ALTER TABLE rsvps ALTER COLUMN email DROP NOT NULL;
    END $$
  `;

  console.log("Table 'rsvps' is up to date.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
