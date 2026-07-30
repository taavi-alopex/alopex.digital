/**
 * Metrics for /teataja-dash, read from PostHog (EU) via HogQL.
 *
 * Server-side only — imported from the /teataja-dash/metrics route handler. The key has no
 * NEXT_PUBLIC_ prefix, so Next never inlines it into a client bundle. Use a key scoped to
 * `query:read` on project 195558; nothing here writes.
 *
 * The Teataja lead magnet shares the "Custom Gains" PostHog project (free plan = one project
 * per org), so every query is scoped by the `leht` event property rather than by URL. The
 * page registers `leht = teataja-kaardistus` as a super property, which rides along on every
 * event including $pageview — so the scope survives the page moving to a different address.
 *
 * Every read is best-effort: if the key is missing or PostHog is unreachable the page still
 * renders with `available: false` instead of erroring.
 */

const HOST = process.env.POSTHOG_API_HOST || "https://eu.posthog.com";
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID || "195558";
const KEY = process.env.POSTHOG_READ_KEY;

/** Scope: this page only, and never our own dev traffic. */
const SCOPE =
  "properties.leht = 'teataja-kaardistus' " +
  "AND properties.$host NOT ILIKE '%127.0.0.1%' " +
  "AND properties.$host NOT ILIKE '%localhost%'";

type Row = (string | number | null)[];

async function hogql(query: string): Promise<Row[]> {
  if (!KEY) throw new Error("POSTHOG_READ_KEY not set");
  const res = await fetch(`${HOST}/api/projects/${PROJECT_ID}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PostHog ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  return (json.results ?? []) as Row[];
}

const num = (v: string | number | null) => Number(v ?? 0);
const str = (v: string | number | null, fallback: string) => {
  const s = String(v ?? "").trim();
  return s === "" || s === "None" ? fallback : s;
};

type Day = { day: string; pageviews: number; visitors: number; leads: number };

/** Expand a sparse daily series to one row per day, back `days` from today. */
function zeroFill(rows: Day[], days: number): Day[] {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const out: Day[] = [];
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  cursor.setUTCDate(cursor.getUTCDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const key = cursor.toISOString().slice(0, 10);
    out.push(byDay.get(key) ?? { day: key, pageviews: 0, visitors: 0, leads: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

export type Metrics = Awaited<ReturnType<typeof getMetrics>>;

export async function getMetrics(days = 30) {
  const since = `timestamp >= now() - INTERVAL ${days} DAY`;
  const where = `${SCOPE} AND ${since}`;

  try {
    const [totals, daily, funnel, voice, voiceStats, sources, devices, leads] = await Promise.all([
      // Headline counters, one pass so the KPI row is internally consistent.
      hogql(
        `SELECT uniqIf(person_id, event = '$pageview')                AS visitors,
                countIf(event = '$pageview')                          AS pageviews,
                uniqIf(person_id, event = 'kaardistus_alustatud')     AS started,
                uniqIf(person_id, event = 'kaardistus_number')        AS activated,
                uniqIf(person_id, event = 'lead_saadetud')            AS leads,
                uniqIf(person_id, event = 'broneering_klikitud')      AS bookings,
                uniqIf(person_id, event = 'haal_alustatud')           AS voice_started,
                uniqIf(person_id, event = 'haal_onnestus')            AS voice_done
         FROM events WHERE ${where}`,
      ),
      // Daily traffic + leads on one axis.
      hogql(
        `SELECT toDate(timestamp)                                   AS day,
                countIf(event = '$pageview')                        AS pageviews,
                uniqIf(person_id, event = '$pageview')              AS visitors,
                countIf(event = 'lead_saadetud')                    AS leads
         FROM events WHERE ${where} GROUP BY day ORDER BY day`,
      ),
      // Main funnel, counted as distinct people per step.
      hogql(
        `SELECT uniqIf(person_id, event = '$pageview')              AS s1,
                uniqIf(person_id, event = 'kaardistus_alustatud')   AS s2,
                uniqIf(person_id, event = 'kaardistus_number')      AS s3,
                uniqIf(person_id, event = 'lead_saadetud')          AS s4
         FROM events WHERE ${where}`,
      ),
      // Voice funnel + the failure modes that explain drop-off.
      hogql(
        `SELECT uniqIf(person_id, event = 'haal_alustatud')         AS started,
                uniqIf(person_id, event = 'haal_saadetud')          AS sent,
                uniqIf(person_id, event = 'haal_onnestus')          AS done,
                uniqIf(person_id, event = 'haal_luba_puudub')       AS denied,
                uniqIf(person_id, event = 'haal_katkestatud')       AS cancelled,
                uniqIf(person_id, event = 'haal_nurjus')            AS failed
         FROM events WHERE ${where}`,
      ),
      // Averages worth watching: recording length against the 5 min cap, rows per recording.
      hogql(
        `SELECT round(avgIf(toFloat(properties.sekundeid), event = 'haal_saadetud'), 1) AS avg_sec,
                max(if(event = 'haal_saadetud', toFloat(properties.sekundeid), 0))      AS max_sec,
                round(avgIf(toFloat(properties.ridu), event = 'haal_onnestus'), 1)      AS avg_rows,
                round(avgIf(toFloat(properties.kulu_aastas), event = 'lead_saadetud'), 0) AS avg_cost
         FROM events WHERE ${where}`,
      ),
      // PostHog writes the literal '$direct' for untracked entries, not an empty string —
      // both have to collapse into one bucket or "(otse)" splits in two.
      hogql(
        `SELECT if(coalesce(properties.$referring_domain, '') IN ('', '$direct'),
                   '(otse)', properties.$referring_domain)          AS source,
                count(DISTINCT person_id)                           AS visitors
         FROM events WHERE ${where} AND event = '$pageview'
         GROUP BY source ORDER BY visitors DESC LIMIT 10`,
      ),
      hogql(
        `SELECT coalesce(nullIf(properties.$device_type, ''), '(teadmata)') AS device,
                count(DISTINCT person_id)                                  AS visitors
         FROM events WHERE ${where} AND event = '$pageview'
         GROUP BY device ORDER BY visitors DESC`,
      ),
      // The question the voice feature was built to answer: does speaking convert better?
      hogql(
        // toString() first: the property arrives as a JSON bool, and comparing a mixed-type
        // IN list against it errors in ClickHouse rather than just missing.
        `SELECT if(toString(properties.haalega) IN ('true', '1'), 'häälega', 'käsitsi') AS viis,
                count()                                                          AS leads,
                round(avg(toFloat(properties.kulu_aastas)), 0)                   AS avg_cost
         FROM events WHERE ${where} AND event = 'lead_saadetud'
         GROUP BY viis ORDER BY leads DESC`,
      ),
    ]);

    const t = totals[0] ?? [];
    const f = funnel[0] ?? [];
    const v = voice[0] ?? [];
    const vs = voiceStats[0] ?? [];

    const visitors = num(t[0]);
    const leadCount = num(t[4]);

    return {
      available: true as const,
      days,
      generatedAt: new Date().toISOString(),
      totals: {
        visitors,
        pageviews: num(t[1]),
        started: num(t[2]),
        activated: num(t[3]),
        leads: leadCount,
        bookings: num(t[5]),
        voiceStarted: num(t[6]),
        voiceDone: num(t[7]),
        // Guarded so an empty window renders 0 rather than NaN.
        leadRate: visitors ? Number(((leadCount / visitors) * 100).toFixed(1)) : 0,
      },
      // Zero-fill. PostHog only returns days that had traffic, so plotting the raw rows
      // draws a continuous line across quiet days — implying traffic that never happened.
      daily: zeroFill(
        daily.map((r) => ({
          day: String(r[0]),
          pageviews: num(r[1]),
          visitors: num(r[2]),
          leads: num(r[3]),
        })),
        days,
      ),
      funnel: [
        { step: "Avas lehe", people: num(f[0]) },
        { step: "Hakkas täitma", people: num(f[1]) },
        { step: "Nägi oma numbrit", people: num(f[2]) },
        { step: "Jättis kontaktid", people: num(f[3]) },
      ],
      voice: {
        steps: [
          { step: "Alustas rääkimist", people: num(v[0]) },
          { step: "Saatis salvestuse", people: num(v[1]) },
          { step: "Sai read", people: num(v[2]) },
        ],
        denied: num(v[3]),
        cancelled: num(v[4]),
        failed: num(v[5]),
        avgSeconds: num(vs[0]),
        maxSeconds: num(vs[1]),
        avgRows: num(vs[2]),
      },
      avgCost: num(vs[3]),
      sources: sources.map((r) => ({ source: str(r[0], "(otse)"), visitors: num(r[1]) })),
      devices: devices.map((r) => ({ device: str(r[0], "(teadmata)"), visitors: num(r[1]) })),
      leadsByMode: leads.map((r) => ({
        viis: str(r[0], "käsitsi"),
        leads: num(r[1]),
        avgCost: num(r[2]),
      })),
    };
  } catch (err) {
    return {
      available: false as const,
      days,
      generatedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}
