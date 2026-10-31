import { NextRequest, NextResponse } from "next/server";
import { CALENDAR_ID, EMAIL_RE, GHL_API, ghl } from "@/lib/v2/booking";

// Books the intro call in GoHighLevel: find or create the contact, then create the appointment.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim();
  const slot = String(body.slot || "");
  const locale = String(body.locale || "en");
  const company = String(body.company || "").trim().slice(0, 120);
  const jobs: string[] = Array.isArray(body.jobs) ? body.jobs.slice(0, 10).map(String) : [];
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  if (Number.isNaN(Date.parse(slot))) return NextResponse.json({ ok: false, error: "slot" }, { status: 400 });

  const auth = ghl();
  if (!auth) return NextResponse.json({ ok: true, live: false });

  const headers = { Authorization: `Bearer ${auth.token}`, "Content-Type": "application/json", Accept: "application/json" };
  try {
    const contactRes = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: { ...headers, Version: "2021-07-28" },
      // Only the email: upsert overwrites the fields it is given, and existing leads must keep their data.
      body: JSON.stringify({ locationId: auth.locationId, email }),
    });
    if (!contactRes.ok) throw new Error(`contact ${contactRes.status}`);
    const contact = (await contactRes.json())?.contact;
    const contactId: string | undefined = contact?.id;
    if (!contactId) throw new Error("no contact id");

    // The company name is filled in only when the contact has none yet, so an existing record is never overwritten.
    if (company && !contact?.companyName) {
      const res = await fetch(`${GHL_API}/contacts/${contactId}`, {
        method: "PUT",
        headers: { ...headers, Version: "2021-07-28" },
        body: JSON.stringify({ companyName: company }),
      });
      if (!res.ok) console.error("booking/book company", res.status);
    }

    // Tags go through the tags endpoint, which adds them. Sending tags in the upsert replaces all existing tags.
    const tagRes = await fetch(`${GHL_API}/contacts/${contactId}/tags`, {
      method: "POST",
      headers: { ...headers, Version: "2021-07-28" },
      body: JSON.stringify({ tags: ["website-booking", `language: ${locale}`, ...jobs.map((j) => `job: ${j.toLowerCase()}`)] }),
    });
    if (!tagRes.ok) console.error("booking/book tags", tagRes.status);

    const apptRes = await fetch(`${GHL_API}/calendars/events/appointments`, {
      method: "POST",
      headers: { ...headers, Version: "2021-04-15" },
      body: JSON.stringify({
        calendarId: CALENDAR_ID,
        locationId: auth.locationId,
        contactId,
        startTime: slot,
        // Every language books the same calendar, so the title says which language the call is in.
        title: `Intro call (${locale.toUpperCase()})${company ? ` · ${company}` : ""}${jobs.length ? `: ${jobs.join(", ")}` : ""}`,
        appointmentStatus: "confirmed",
        toNotify: true,
      }),
    });
    if (!apptRes.ok) throw new Error(`appointment ${apptRes.status}`);
    return NextResponse.json({ ok: true, live: true });
  } catch (err) {
    console.error("booking/book", err);
    return NextResponse.json({ ok: false, error: "booking" }, { status: 502 });
  }
}
