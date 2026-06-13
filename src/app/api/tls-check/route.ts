import { NextRequest } from "next/server";

// On-demand TLS gatekeeper for Caddy.
// Caddy calls this (?domain=<host>) before issuing a certificate for an
// unmatched host. We only allow certificates for our own apex + subdomains,
// so the catch-all reverse proxy can't be abused to mint certs for arbitrary
// domains pointed at this server.
export function GET(req: NextRequest) {
  const domain = (req.nextUrl.searchParams.get("domain") || "").toLowerCase();
  const allowed =
    domain === "alopex.digital" || domain.endsWith(".alopex.digital");
  return new Response(allowed ? "ok" : "denied", {
    status: allowed ? 200 : 403,
  });
}
