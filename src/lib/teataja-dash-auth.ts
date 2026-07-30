import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Session auth for /teataja-dash.
 *
 * Deliberately an in-app login form, not Caddy basic_auth. Basic auth was tried on
 * taavitaavi.com and removed: Caddy answers 401 with an empty body, so a browser that
 * declines to show the credential dialog leaves the navigation uncommitted — the previous
 * page just stays on screen and there is no visible way in. A form always works.
 *
 * No dependencies: the session is a `<expiry>.<hmac>` token signed with
 * TEATAJA_DASH_SESSION_SECRET. There is one user, so there is nothing to look up — a valid
 * signature IS the session.
 */

const COOKIE = "alopex_teataja_dash";
const COOKIE_PATH = "/teataja-dash";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days — solo admin page

/**
 * Signing secret. Falls back to a per-boot random value so a missing env var fails closed
 * (tokens simply never validate) instead of signing with a guessable constant.
 */
const SECRET = process.env.TEATAJA_DASH_SESSION_SECRET || randomBytes(32).toString("hex");

function sign(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex");
}

/** Constant-time compare that tolerates unequal lengths (digest first, then compare). */
function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", SECRET).update(a).digest();
  const hb = createHmac("sha256", SECRET).update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function createToken(): string {
  const expiry = String(Date.now() + MAX_AGE_MS);
  return `${expiry}.${sign(expiry)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiry, mac] = token.split(".");
  if (!expiry || !mac) return false;
  if (!safeEqual(sign(expiry), mac)) return false;
  return Number(expiry) > Date.now();
}

/** True when the password matches TEATAJA_DASH_PASSWORD. Unset password ⇒ always false. */
export function checkPassword(input: string): boolean {
  const expected = process.env.TEATAJA_DASH_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

/** Read the session off the incoming request. Safe to call from a Server Component. */
export async function isAuthed(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

/** Set the session cookie. Only valid inside a Server Action or Route Handler. */
export async function startSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, createToken(), {
    httpOnly: true,
    // Secure in production. Left off in dev because `next dev` serves plain http, and a
    // Secure cookie there is dropped — the login would appear to succeed and then bounce
    // straight back to the form, which looks like a wrong password.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    expires: new Date(Date.now() + MAX_AGE_MS),
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  // Must repeat the path. A cookie set at /teataja-dash is NOT matched by a delete at the
  // default "/", so a bare delete(COOKIE) leaves the session alive and sign-out silently
  // does nothing.
  jar.delete({ name: COOKIE, path: COOKIE_PATH });
}
