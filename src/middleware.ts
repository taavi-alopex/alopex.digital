import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The old campaign subdomain: its landing page was removed (31.10.2026), so it sends visitors to the main site.
const CAMPAIGN_HOST = "automate.alopex.digital";

export default function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();

  if (host === CAMPAIGN_HOST) {
    const locale = req.nextUrl.pathname.match(/^\/(en|et|pl)(\/|$)/)?.[1] ?? "et";
    return NextResponse.redirect(`https://alopex.digital/${locale}`, 308);
  }

  return intlMiddleware(req);
}

export const config = {
  // Exclude _next, api, static files (anything with a dot), and the routes that must not
  // get a locale prefix: the rewritten static pages and the Teataja admin dashboard.
  matcher: [
    "/((?!api|_next|_vercel|pricing|sample-dashboard|teataja|teataja-dash|.*\\..*).*)",
  ],
};
