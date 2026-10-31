// Shared booking helpers for the API routes (server only).

/** Every call from the site, in every language, is booked in Martin's calendar: "Discovery Call with Martin Teras (30 min)". */
export const CALENDAR_ID = "Cpq4e6doG8jAqqU9NEGU";

export const TIMEZONE = "Europe/Tallinn";
export const GHL_API = "https://services.leadconnectorhq.com";
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** GoHighLevel private-integration token; without it the booking runs in demo mode. */
export function ghl() {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  return token && locationId ? { token, locationId } : null;
}

export type Day = { date: string; slots: string[] };

/** Keep it short on screen: one morning and one afternoon time per day, five working days. */
export function pickSlots(days: Day[]): Day[] {
  return days
    .filter((d) => d.slots.length)
    .slice(0, 5)
    .map((d) => {
      const hour = (s: string) => Number(s.slice(11, 13));
      const am = d.slots.find((s) => hour(s) < 12);
      const pm = d.slots.find((s) => hour(s) >= 12);
      return { date: d.date, slots: [am, pm].filter(Boolean) as string[] };
    });
}

/** Demo times for local work: the next five working days. */
export function demoDays(): Day[] {
  const times = [["10:00", "13:00"], ["09:00", "14:30"], ["11:30", "15:00"], ["10:00", "16:00"], ["09:30", "13:00"]];
  const days: Day[] = [];
  const d = new Date();
  while (days.length < 5) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ date, slots: times[days.length].map((t) => `${date}T${t}:00+02:00`) });
  }
  return days;
}
