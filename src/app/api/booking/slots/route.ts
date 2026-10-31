import { NextRequest, NextResponse } from "next/server";
import { CALENDAR_ID, GHL_API, TIMEZONE, demoDays, ghl, pickSlots, type Day } from "@/lib/v2/booking";

// Free call times from Martin's calendar (the same for every language).
// Default: the next five days with two picks each. ?range=full: every free time in the next four weeks, for the calendar.
export async function GET(req: NextRequest) {
  const full = req.nextUrl.searchParams.get("range") === "full";
  const calendarId = CALENDAR_ID;
  const auth = ghl();
  if (!auth) return NextResponse.json({ live: false, days: full ? demoDays(20) : pickSlots(demoDays()) });

  const start = Date.now() + 12 * 3600 * 1000;
  const end = start + (full ? 28 : 14) * 24 * 3600 * 1000;
  const url = `${GHL_API}/calendars/${calendarId}/free-slots?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(TIMEZONE)}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${auth.token}`, Version: "2021-04-15" },
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`GHL ${res.status}`);
    const data = (await res.json()) as Record<string, { slots?: string[] }>;
    const days: Day[] = Object.entries(data)
      .filter(([k, v]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && Array.isArray(v?.slots))
      .map(([date, v]) => ({ date, slots: v.slots as string[] }))
      .sort((a, b) => a.date.localeCompare(b.date));
    return NextResponse.json({ live: true, days: full ? days : pickSlots(days) });
  } catch (err) {
    console.error("booking/slots", err);
    return NextResponse.json({ live: false, error: "unavailable", days: [] }, { status: 502 });
  }
}
