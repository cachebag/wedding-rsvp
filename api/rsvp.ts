import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./lib/db.js";
import { verifySession } from "./lib/session.js";

interface RsvpBody {
  name: string;
  email: string;
  attending: string;
  plusFirstName?: string;
  plusLastName?: string;
  travelingFrom?: string;
  dietary?: string;
  message?: string;
  event?: string;
}

function isValidBody(body: unknown): body is RsvpBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.attending === "string" &&
    b.attending.trim().length > 0
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    if (!isValidBody(req.body)) {
      return res.status(400).json({ error: "Invalid RSVP data" });
    }

    const { name, email, attending, plusFirstName, plusLastName, travelingFrom, dietary, message, event } = req.body;
    const eventValue = event === "mexico" ? "mexico" : "auburn";
    const sql = getDb();

    await sql`
      INSERT INTO rsvps (name, email, attending, plus_first_name, plus_last_name, traveling_from, dietary, message, event)
      VALUES (${name.trim()}, ${email.trim()}, ${attending}, ${plusFirstName?.trim() || null}, ${plusLastName?.trim() || null}, ${travelingFrom?.trim() || null}, ${dietary?.trim() || null}, ${message?.trim() || null}, ${eventValue})
    `;

    return res.status(201).json({ ok: true });
  }

  if (req.method === "GET") {
    if (!verifySession(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const sql = getDb();
    const rows = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;
    return res.status(200).json(rows);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
