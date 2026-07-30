import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Campaign subdomain served by the same app/infra as the main site.
// automate.alopex.digital -> the /automate-sales landing page.
const CAMPAIGN_HOST = "automate.alopex.digital";
// The Instantly campaign is Estonian-first, so the bare subdomain root
// resolves to the Estonian landing page.
const CAMPAIGN_DEFAULT_LOCALE = "et";

export default function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();

  if (host === CAMPAIGN_HOST) {
    const url = req.nextUrl;
    const path = url.pathname;

    // Already on the campaign page (any locale) — let it render.
    if (/^\/(en|et|pl)\/automate-sales(\/|$)/.test(path)) {
      return intlMiddleware(req);
    }

    // Respect an explicit locale prefix (e.g. /en, /pl), otherwise default to ET.
    const localeMatch = path.match(/^\/(en|et|pl)(\/|$)/);
    const locale = localeMatch ? localeMatch[1] : CAMPAIGN_DEFAULT_LOCALE;

    url.pathname = `/${locale}/automate-sales`;
    return NextResponse.rewrite(url);
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
