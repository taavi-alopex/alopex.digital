import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude _next, api, static files (anything with a dot)
  matcher: ["/((?!api|_next|_vercel|pricing|sample-dashboard|.*\\..*).*)"],
};
