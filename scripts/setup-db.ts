import { neon } from "@neondatabase/serverless";

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
      email TEXT NOT NULL,
      attending TEXT NOT NULL,
      plus_first_name TEXT,
      plus_last_name TEXT,
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
    END $$
  `;

  console.log("Table 'rsvps' is up to date.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
