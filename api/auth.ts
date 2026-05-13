import type { VercelRequest, VercelResponse } from "@vercel/node";
import { timingSafeEqual } from "crypto";
import { setSessionCookie, verifySession } from "./lib/session.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    return res.json({ authenticated: verifySession(req) });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body ?? {};
  if (!password || typeof password !== "string") {
    return res.status(400).json({ error: "Password required" });
  }

  const expected = process.env.ADMIN_PASSWORD!;
  const a = new TextEncoder().encode(password);
  const b = new TextEncoder().encode(expected);

  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  setSessionCookie(res);
  return res.status(200).json({ ok: true });
}
