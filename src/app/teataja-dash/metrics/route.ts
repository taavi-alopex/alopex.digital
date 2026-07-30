import { getMetrics } from "@/lib/teataja-metrics";
import { isAuthed } from "@/lib/teataja-dash-auth";

// Live numbers on every request — never prerendered, never cached.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Gated independently of the page: this endpoint returns the same data, so protecting
  // only the page would leave the numbers readable by anyone who guessed the URL.
  if (!(await isAuthed())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const days = Number(new URL(request.url).searchParams.get("days")) || 30;
  // Clamp so a hand-edited query string can't ask PostHog for an unbounded range.
  const metrics = await getMetrics(Math.min(Math.max(days, 1), 365));
  return Response.json(metrics, { headers: { "Cache-Control": "no-store" } });
}
