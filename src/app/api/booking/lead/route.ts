import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE } from "@/lib/v2/booking";

// The email is sent as soon as it's typed, so we keep the lead even if the visitor leaves before booking.
// Goes to the same GoHighLevel inbound webhook as the old qualification form.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });

  const webhook = process.env.GHL_LEAD_WEBHOOK || process.env.NEXT_PUBLIC_GHL_QUALIFICATION_WEBHOOK;
  if (!webhook) return NextResponse.json({ ok: true, live: false });

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        company: String(body.company || "").trim().slice(0, 120),
        jobs: Array.isArray(body.jobs) ? body.jobs.slice(0, 10).map(String) : [],
        locale: String(body.locale || "en"),
        source: "website_booking_block",
        step: "email_capture",
        timestamp: new Date().toISOString(),
      }),
    });
    return NextResponse.json({ ok: true, live: true });
  } catch (err) {
    console.error("booking/lead", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
