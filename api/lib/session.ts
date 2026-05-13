import { createHmac, timingSafeEqual } from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 30;

function sign(payload: string): string {
  return createHmac("sha256", process.env.SESSION_SECRET!)
    .update(payload)
    .digest("hex");
}

export function setSessionCookie(res: VercelResponse): void {
  const issued = Date.now().toString();
  const signature = sign(issued);
  const value = `${issued}.${signature}`;
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${MAX_AGE}`
  );
}

export function verifySession(req: VercelRequest): boolean {
  const raw = req.cookies?.[COOKIE_NAME];
  if (!raw) return false;

  const dotIdx = raw.indexOf(".");
  if (dotIdx === -1) return false;

  const issued = raw.slice(0, dotIdx);
  const sig = raw.slice(dotIdx + 1);

  const expected = sign(issued);
  if (sig.length !== expected.length) return false;

  const enc = new TextEncoder();
  const valid = timingSafeEqual(enc.encode(sig), enc.encode(expected));
  if (!valid) return false;

  const age = Date.now() - Number(issued);
  return age < MAX_AGE * 1000;
}
