"use client";

import { useCallback, useEffect, useState } from "react";
import type { Metrics } from "@/lib/teataja-metrics";

/**
 * Teataja lead-magnet dashboard.
 *
 * Series colours are the brand accents stepped into the dark-mode lightness band
 * (OKLCH L 0.48–0.67) so they pass the categorical palette checks against the
 * --dark-surface panel: amber #C87C33 + spruce #43A97A, CVD ΔE 8.5 (deutan) /
 * 18.9 (normal). Do not substitute the raw brand hexes by eye — #D4873F and
 * #52B788 both sit above the band and fail. Each series also gets its own panel
 * and title, so identity never rests on hue alone.
 *
 * Traffic and leads are deliberately TWO charts. One chart with both would need a
 * second y-scale — visitors run an order of magnitude above leads — and a dual-axis
 * chart lets you imply any correlation you like by choosing the scales.
 */

const TRAFFIC = "#C87C33";
const CONVERT = "#43A97A";

const RANGES = [7, 30, 90] as const;

const fmt = (n: number) => Math.round(n).toLocaleString("et-EE");
const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

export default function DashClient() {
  const [days, setDays] = useState<number>(30);
  const [data, setData] = useState<Metrics | null>(null);
  const [laen, setLaen] = useState(true);
  const [viga, setViga] = useState<string | null>(null);
  const [tabelina, setTabelina] = useState(false);

  const lae = useCallback(async (d: number) => {
    setLaen(true);
    setViga(null);
    try {
      const res = await fetch(`/teataja-dash/metrics?days=${d}`, { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/teataja-dash/login";
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
    } catch (e) {
      setViga(e instanceof Error ? e.message : "tundmatu viga");
    } finally {
      setLaen(false);
    }
  }, []);

  useEffect(() => {
    lae(days);
  }, [days, lae]);

  return (
    <main className="min-h-screen bg-[var(--midnight)] px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--mist)]">
              Teataja kaardistus
            </p>
            <h1 className="font-[family-name:var(--font-instrument-serif)] text-[34px] leading-[1.1] text-[var(--frost)] md:text-[44px]">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setDays(r)}
                aria-pressed={days === r}
                className={`rounded-lg border px-3.5 py-2 font-[family-name:var(--font-outfit)] text-sm transition-colors ${
                  days === r
                    ? "border-[var(--spruce)] bg-[var(--spruce)]/20 text-[var(--frost)]"
                    : "border-white/[0.14] text-white/60 hover:border-white/30 hover:text-[var(--frost)]"
                }`}
              >
                {r} p
              </button>
            ))}
            <a
              href="/teataja-dash/logout"
              className="ml-2 rounded-lg border border-white/[0.14] px-3.5 py-2 font-[family-name:var(--font-outfit)] text-sm text-white/45 transition-colors hover:border-white/30 hover:text-[var(--frost)]"
            >
              Logi välja
            </a>
          </div>
        </header>

        {viga ? <Teade tekst={`Andmete lugemine ebaõnnestus: ${viga}`} /> : null}
        {data && !data.available ? (
          <Teade tekst={`PostHog ei vastanud: ${data.error}. Kontrolli POSTHOG_READ_KEY väärtust.`} />
        ) : null}
        {laen && !data ? <Teade tekst="Laen…" /> : null}

        {data && data.available ? (
          <div className={laen ? "opacity-60 transition-opacity" : "transition-opacity"}>
            <Kpid t={data.totals} />

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <Paneel
                pealkiri="Külastajad päevas"
                kirjeldus="Unikaalsed inimesed, mitte lehe avamised."
              >
                <Ribad
                  read={data.daily.map((d) => ({ silt: d.day, vaartus: d.visitors }))}
                  varv={TRAFFIC}
                />
              </Paneel>

              <Paneel
                pealkiri="Lead'id päevas"
                kirjeldus="Vorm läks läbi. Eraldi graafik, sest ühine y-telg annaks vale mulje."
              >
                <Ribad
                  read={data.daily.map((d) => ({ silt: d.day, vaartus: d.leads }))}
                  varv={CONVERT}
                />
              </Paneel>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setTabelina((v) => !v)}
                className="font-[family-name:var(--font-outfit)] text-[13px] text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[var(--frost)]"
              >
                {tabelina ? "Peida päevade tabel" : "Näita päevade tabelit"}
              </button>
            </div>

            {tabelina ? (
              <Paneel pealkiri="Päevade kaupa" kirjeldus={null}>
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full font-[family-name:var(--font-jetbrains-mono)] text-[12.5px]">
                    <thead className="sticky top-0 bg-[var(--dark-surface)] text-left text-white/45">
                      <tr>
                        <th className="py-2 font-medium">Päev</th>
                        <th className="py-2 text-right font-medium">Külastajad</th>
                        <th className="py-2 text-right font-medium">Avamised</th>
                        <th className="py-2 text-right font-medium">Lead'id</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--frost)]">
                      {data.daily.map((d) => (
                        <tr key={d.day} className="border-t border-white/[0.07]">
                          <td className="py-1.5">{d.day}</td>
                          <td className="py-1.5 text-right">{fmt(d.visitors)}</td>
                          <td className="py-1.5 text-right">{fmt(d.pageviews)}</td>
                          <td className="py-1.5 text-right">{fmt(d.leads)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Paneel>
            ) : null}

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <Paneel
                pealkiri="Põhivoog"
                kirjeldus={'„Nägi oma numbrit" on hetk, mil ekraanil on esimene päris eurosumma.'}
              >
                <Lehter sammud={data.funnel} varv={CONVERT} />
              </Paneel>

              <Paneel
                pealkiri="Häälevoog"
                kirjeldus="Kui suur osa rääkima hakanutest jõuab valmis ridadeni."
              >
                <Lehter sammud={data.voice.steps} varv={TRAFFIC} />
                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-4">
                  <Vaike silt="Luba keelatud" vaartus={fmt(data.voice.denied)} />
                  <Vaike silt="Jättis pooleli" vaartus={fmt(data.voice.cancelled)} />
                  <Vaike silt="Töötlemine nurjus" vaartus={fmt(data.voice.failed)} />
                  <Vaike
                    silt="Keskmine pikkus"
                    vaartus={data.voice.avgSeconds ? `${fmt(data.voice.avgSeconds)} s` : "—"}
                  />
                  <Vaike
                    silt="Pikim"
                    vaartus={data.voice.maxSeconds ? `${fmt(data.voice.maxSeconds)} s` : "—"}
                  />
                  <Vaike
                    silt="Ridu salvestuse kohta"
                    vaartus={data.voice.avgRows ? String(data.voice.avgRows) : "—"}
                  />
                </div>
                {data.voice.maxSeconds >= 295 ? (
                  <p className="mt-4 font-[family-name:var(--font-outfit)] text-[13px] text-[var(--amber-light)]">
                    Keegi jooksis 5 minuti piirini. Kui see kordub, on piir liiga madal.
                  </p>
                ) : null}
              </Paneel>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              <Paneel
                pealkiri="Hääl vs käsitsi"
                kirjeldus="Ainus küsimus, mille pärast hääl ehitati."
              >
                {data.leadsByMode.length ? (
                  <ul className="space-y-4">
                    {data.leadsByMode.map((r) => (
                      <li key={r.viis}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-[family-name:var(--font-outfit)] text-[15px] font-medium text-[var(--frost)]">
                            {r.viis}
                          </span>
                          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-bold text-[var(--frost)]">
                            {fmt(r.leads)}
                          </span>
                        </div>
                        <p className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[11.5px] text-white/45">
                          keskmine kaardistus {r.avgCost ? `${fmt(r.avgCost)} €` : "—"}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Tuhi />
                )}
              </Paneel>

              <Paneel pealkiri="Kust tuldi" kirjeldus={null}>
                <Tabel read={data.sources.map((s) => [s.source, fmt(s.visitors)])} />
              </Paneel>

              <Paneel pealkiri="Seade" kirjeldus="Ajakirjast tulija loeb tõenäoliselt telefonis.">
                <Tabel read={data.devices.map((d) => [d.device, fmt(d.visitors)])} />
              </Paneel>
            </div>

            <p className="mt-8 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-white/30">
              PostHog projekt 195558 · filter leht = teataja-kaardistus · uuendatud{" "}
              {new Date(data.generatedAt).toLocaleString("et-EE")}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

/* ---------------------------------------------------------------- osad */

function Teade({ tekst }: { tekst: string }) {
  return (
    <p className="rounded-xl border border-white/[0.07] bg-[var(--dark-surface)] px-5 py-4 font-[family-name:var(--font-outfit)] text-[15px] text-white/65">
      {tekst}
    </p>
  );
}

function Tuhi() {
  return <p className="font-[family-name:var(--font-outfit)] text-sm text-white/45">Andmeid veel ei ole.</p>;
}

function Paneel({
  pealkiri,
  kirjeldus,
  children,
}: {
  pealkiri: string;
  kirjeldus: string | null;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[var(--dark-surface)] p-5 md:p-6">
      <h2 className="font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-[var(--frost)]">
        {pealkiri}
      </h2>
      {kirjeldus ? (
        <p className="mt-1.5 font-[family-name:var(--font-outfit)] text-[13px] leading-relaxed text-white/45">
          {kirjeldus}
        </p>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Kpid({ t }: { t: Extract<Metrics, { available: true }>["totals"] }) {
  const kaardid: [string, string, string | null][] = [
    ["Külastajad", fmt(t.visitors), `${fmt(t.pageviews)} avamist`],
    ["Hakkas täitma", fmt(t.started), `${pct(t.started, t.visitors)}% külastajatest`],
    ["Nägi oma numbrit", fmt(t.activated), `${pct(t.activated, t.visitors)}% külastajatest`],
    ["Lead'id", fmt(t.leads), `${t.leadRate}% külastajatest`],
    ["Broneeringud", fmt(t.bookings), null],
    ["Rääkis sisse", fmt(t.voiceStarted), `${fmt(t.voiceDone)} sai read`],
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {kaardid.map(([silt, arv, all]) => (
        <div
          key={silt}
          className="rounded-xl border border-white/[0.07] bg-[var(--dark-surface)] px-4 py-4"
        >
          <p className="font-[family-name:var(--font-outfit)] text-[12px] font-medium text-white/45">
            {silt}
          </p>
          <p className="mt-2 font-[family-name:var(--font-instrument-serif)] text-[30px] leading-none text-[var(--frost)]">
            {arv}
          </p>
          {all ? (
            <p className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-white/35">
              {all}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Vaike({ silt, vaartus }: { silt: string; vaartus: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-outfit)] text-[11.5px] leading-tight text-white/45">
        {silt}
      </p>
      <p className="mt-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[15px] font-bold text-[var(--frost)]">
        {vaartus}
      </p>
    </div>
  );
}

/** Päevade tulbad. Üks seeria paneeli kohta, nii et värv ei kanna identiteeti üksi. */
function Ribad({ read, varv }: { read: { silt: string; vaartus: number }[]; varv: string }) {
  const max = Math.max(...read.map((r) => r.vaartus), 1);
  const koik0 = read.every((r) => r.vaartus === 0);

  return (
    <>
      <div className="flex h-32 items-end gap-[2px]" role="img" aria-label="Päevane jaotus">
        {read.map((r) => (
          <div
            key={r.silt}
            title={`${r.silt}: ${fmt(r.vaartus)}`}
            className="group relative flex-1 rounded-t-[4px] transition-opacity hover:opacity-100"
            style={{
              height: `${Math.max((r.vaartus / max) * 100, r.vaartus > 0 ? 3 : 1.5)}%`,
              minHeight: 2,
              background: r.vaartus > 0 ? varv : "rgba(255,255,255,0.08)",
              opacity: r.vaartus > 0 ? 0.9 : 1,
            }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-[11px] text-white/35">
        <span>{read[0]?.silt}</span>
        <span>{koik0 ? "andmeid veel ei ole" : `tipp ${fmt(max)}`}</span>
        <span>{read[read.length - 1]?.silt}</span>
      </div>
    </>
  );
}

/** Lehter. Iga samm on otse sildistatud, nii et lugemine ei sõltu värvist. */
function Lehter({ sammud, varv }: { sammud: { step: string; people: number }[]; varv: string }) {
  const alus = Math.max(sammud[0]?.people ?? 0, 1);

  return (
    <ol className="space-y-3.5">
      {sammud.map((s, i) => {
        const eelmine = i > 0 ? sammud[i - 1].people : null;
        return (
          <li key={s.step}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--font-outfit)] text-[14px] text-[var(--frost)]">
                {s.step}
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[14px] font-bold text-[var(--frost)]">
                {fmt(s.people)}
                {eelmine !== null ? (
                  <span className="ml-2 font-normal text-white/40">{pct(s.people, eelmine)}%</span>
                ) : null}
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-white/[0.06]">
              <div
                className="h-2 rounded-full"
                style={{ width: `${Math.max(pct(s.people, alus), s.people > 0 ? 2 : 0)}%`, background: varv }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Tabel({ read }: { read: [string, string][] }) {
  if (!read.length) return <Tuhi />;
  return (
    <table className="w-full font-[family-name:var(--font-jetbrains-mono)] text-[12.5px]">
      <tbody className="text-[var(--frost)]">
        {read.map(([a, b]) => (
          <tr key={a} className="border-t border-white/[0.07] first:border-t-0">
            <td className="py-2 pr-3 break-all">{a}</td>
            <td className="py-2 text-right tabular-nums">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
