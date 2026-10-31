"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MetaEvents } from "@/components/MetaPixel";
import { fmt, type SiteText } from "@/content/v2/text";
import { BookLink } from "./BookLink";

type Text = SiteText["check"];
type TaskId = keyof Text["tasks"];
export type Area = keyof Text["recs"];
export type Example = { name: string; system: string; href: string };

// Per job: a typical starting guess (hours a week per person), the share a system usually takes over, and which kind of work it is.
const TASKS: { id: TaskId; hours: number; share: number; area: Area }[] = [
  { id: "reply", hours: 5, share: 0.6, area: "reply" },
  { id: "copy", hours: 4, share: 0.8, area: "ops" },
  { id: "quotes", hours: 6, share: 0.5, area: "quotes" },
  { id: "followup", hours: 2, share: 0.8, area: "followup" },
  { id: "invoices", hours: 3, share: 0.7, area: "ops" },
  { id: "reports", hours: 3, share: 0.8, area: "reports" },
  { id: "leads", hours: 4, share: 0.6, area: "sales" },
  { id: "booking", hours: 2, share: 0.6, area: "reply" },
];
const WEEKS = 46;
const FULL_TIME = WEEKS * 40;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LOCALE_TAG: Record<string, string> = { en: "en-GB", et: "et-EE", pl: "pl-PL" };

type Pick = { hours: number; people: number };

/** Receipt date: 31.10.2026 14:05 (Estonian time with a dot: 14.05). */
function printDate(d: Date, locale: string) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}${locale === "et" ? "." : ":"}${p(d.getMinutes())}`;
}

/** Counts smoothly towards a new value, so the receipt total visibly adds up. */
function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 450);
      const v = a + (value - a) * (1 - Math.pow(1 - k, 3));
      setShown(v);
      from.current = v;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

function Stepper({ value, onChange, step, min, max, unit, less, more }: { value: number; onChange: (v: number) => void; step: number; min: number; max: number; unit: string; less: string; more: string }) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, Math.round(v / step) * step)));
  return (
    <span className="fc-step">
      <button type="button" aria-label={`${less}: ${unit}`} onClick={() => set(value - step)} disabled={value <= min}>−</button>
      <b>{value}</b>
      <button type="button" aria-label={`${more}: ${unit}`} onClick={() => set(value + step)} disabled={value >= max}>+</button>
      <small>{unit}</small>
    </span>
  );
}

/** The manual-work check: pick jobs, set time, see a live yearly "receipt" and where we would start. */
export function FreeCheck({ t, examples }: { t: Text; examples: Record<Area, Example> }) {
  const locale = useLocale();
  const [picks, setPicks] = useState<Partial<Record<TaskId, Pick>>>({});
  const [rate, setRate] = useState(25);
  const [contact, setContact] = useState({ email: "", company: "" });
  const [state, setState] = useState<"idle" | "bad" | "sent">("idle");
  // What was printed: a snapshot, so the paper doesn't change if the numbers are edited afterwards.
  const [printout, setPrintout] = useState<null | { rows: { name: string; cost: string }[]; total: string; auto: string; idea: string; email: string; date: string }>(null);

  const tag = LOCALE_TAG[locale] ?? "en-GB";
  const money = (n: number) => new Intl.NumberFormat(tag, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const num = (n: number, d = 0) => new Intl.NumberFormat(tag, { maximumFractionDigits: d }).format(n);

  const rows = TASKS.filter((x) => picks[x.id]).map((x) => {
    const p = picks[x.id]!;
    const hours = p.hours * p.people * WEEKS;
    return { ...x, ...p, yearHours: hours, cost: hours * rate, autoHours: hours * x.share, autoCost: hours * x.share * rate };
  });
  const totalHours = rows.reduce((s, r) => s + r.yearHours, 0);
  const totalCost = rows.reduce((s, r) => s + r.cost, 0);
  const autoHours = rows.reduce((s, r) => s + r.autoHours, 0);
  const autoCost = rows.reduce((s, r) => s + r.autoCost, 0);
  const top = [...rows].sort((a, b) => b.autoCost - a.autoCost)[0];
  const level: keyof Text["levels"] = autoCost > 15000 ? "high" : autoCost > 5000 ? "medium" : "low";

  const shownCost = useTween(totalCost);
  const shownAuto = useTween(autoCost);

  const toggle = (id: TaskId, hours: number) => {
    setPicks((p) => {
      const next = { ...p };
      if (next[id]) delete next[id];
      else next[id] = { hours, people: 1 };
      return next;
    });
  };
  const update = (id: TaskId, patch: Partial<Pick>) => setPicks((p) => ({ ...p, [id]: { ...p[id]!, ...patch } }));

  const ex = top ? examples[top.area] : null;
  const rec = top ? t.recs[top.area] : null;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(contact.email)) return setState("bad");
    setState("sent");
    setPrintout({
      rows: rows.map((r) => ({ name: t.tasks[r.id][0], cost: money(r.cost) })),
      total: money(totalCost),
      auto: money(autoCost),
      idea: rec ? rec[0] : "",
      email: contact.email,
      date: printDate(new Date(), locale),
    });
    MetaEvents.lead({ content_name: "Manual Work Check" });
    const url = process.env.NEXT_PUBLIC_GHL_ASSESSMENT_WEBHOOK;
    if (!url) return;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          check: "manual_work_cost",
          score: { high: 80, medium: 50, low: 20 }[level],
          potential: level,
          estimate_eur_per_year: Math.round(totalCost),
          automatable_eur_per_year: Math.round(autoCost),
          hours_per_year: Math.round(totalHours),
          hourly_cost_eur: rate,
          answers: rows.map((r) => ({ task: t.tasks[r.id][0], hours_per_week: r.hours, people: r.people, eur_per_year: Math.round(r.cost) })),
          locale,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // The result stays on screen either way.
    }
  };


  return (
    <>
      <div className="fc">
        <div className="fc-main">
          <div className="card fc-card">
            <span className="mono muted">01</span>
            <h2>{t.step1}</h2>
            <p className="muted">{t.step1Hint}</p>
            <div className="fc-tasks">
              {TASKS.map((x) => (
                <button key={x.id} type="button" className="fc-task" aria-pressed={!!picks[x.id]} onClick={() => toggle(x.id, x.hours)}>
                  <i aria-hidden="true" />
                  <b>{t.tasks[x.id][0]}</b>
                  <span>{t.tasks[x.id][1]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`card fc-card${rows.length ? "" : " off"}`}>
            <span className="mono muted">02</span>
            <h2>{t.step2}</h2>
            <p className="muted">{t.step2Hint}</p>
            {rows.length > 0 && (
              <ul className="fc-rows">
                {rows.map((r) => (
                  <li key={r.id}>
                    <b>{t.tasks[r.id][0]}</b>
                    <Stepper value={r.hours} step={0.5} min={0.5} max={40} unit={t.perWeek} less={t.less} more={t.more} onChange={(v) => update(r.id, { hours: v })} />
                    <Stepper value={r.people} step={1} min={1} max={50} unit={t.people} less={t.less} more={t.more} onChange={(v) => update(r.id, { people: v })} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`card fc-card${rows.length ? "" : " off"}`}>
            <span className="mono muted">03</span>
            <h2>{t.step3}</h2>
            <p className="muted">{t.step3Hint}</p>
            <label className="fc-rate">
              <input type="range" min={15} max={80} step={1} value={rate} onChange={(e) => setRate(+e.target.value)} aria-label={t.step3} />
              <b>{money(rate)}</b>
            </label>
          </div>
        </div>

        <aside className="fc-receipt" id="fc-receipt" aria-live="polite">
          <span className="mono muted">{t.receipt}</span>
          {rows.length === 0 ? (
            <p className="fc-empty">{t.empty}</p>
          ) : (
            <>
              <ul className="fc-lines">
                {rows.map((r) => (
                  <li key={r.id}>
                    <span>{t.tasks[r.id][0]}</span>
                    <small>{fmt(t.hoursYear, { h: num(r.yearHours) })}</small>
                    <b>{money(r.cost)}</b>
                  </li>
                ))}
              </ul>
              <div className="fc-total">
                <span>{t.total}</span>
                <b>{money(Math.round(shownCost / 10) * 10)}</b>
                <small>
                  {fmt(t.totalHours, { h: num(totalHours) })} · {fmt(t.fte, { n: num(totalHours / FULL_TIME, 1) })}
                </small>
              </div>
              <div className="fc-auto">
                <span>{t.auto}</span>
                <b>{money(Math.round(shownAuto / 10) * 10)}</b>
                <div className="fc-bar" aria-hidden="true">
                  <i style={{ width: `${totalCost ? (autoCost / totalCost) * 100 : 0}%` }} />
                </div>
                <small>
                  {fmt(t.autoHours, { h: num(autoHours) })} · {t.potential}: <em className={`pot ${level}`}>{t.levels[level]}</em>
                </small>
              </div>
              <p className="fc-note">{t.note}</p>
            </>
          )}
        </aside>
      </div>

      {rows.length > 0 && (
        // Phones: the receipt sits below the steps, so a small bar keeps the total in view.
        <a className="fc-mini" href="#fc-receipt">
          <span>{t.total}</span>
          <b>{money(Math.round(shownCost / 10) * 10)}</b>
          <span aria-hidden="true">↓</span>
        </a>
      )}

      {top && rec && ex && (
        <div className="fc-next">
          <div className="card rec">
            <span className="mono muted">{t.startHere}</span>
            <h2>{rec[0]}</h2>
            <p>{rec[1]}</p>
            <div className="ex">
              <div>
                <span className="mono muted">{t.builtFor}</span>
                <b>{ex.name} · {ex.system}</b>
              </div>
              <Link className="link" href={ex.href}>{t.seeIt}</Link>
            </div>
            <div className="acts">
              <BookLink>{t.talk}</BookLink>
              <button className="link" type="button" onClick={() => { setPicks({}); setState("idle"); setPrintout(null); }}>{t.again}</button>
            </div>
          </div>
          <div className={`fc-printer${printout ? " printing" : ""}`}>
            <form className="card fc-send" onSubmit={send}>
              <span className="fc-led" aria-hidden="true" />
              <b>{t.sendTitle}</b>
              <p className="muted">{t.sendText}</p>
              {printout ? (
                <p className="form-done">{t.printed}</p>
              ) : (
                <>
                  <input type="email" className={state === "bad" ? "shake" : undefined} placeholder={t.email} aria-label={t.email} value={contact.email} onChange={(e) => { setState("idle"); setContact({ ...contact, email: e.target.value.trim() }); }} />
                  <input placeholder={t.company} aria-label={t.company} value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
                  {state === "bad" && <small className="err">{t.badEmail}</small>}
                  <button className="btn" type="submit">{t.send}</button>
                </>
              )}
              <span className="fc-slot" aria-hidden="true" />
            </form>
            {printout && (
              <div className="fc-paper-wrap">
                <div className="fc-paper" role="status">
                  {[
                    <p key="h" className="c"><b>ALOPEX DIGITAL</b></p>,
                    <p key="t" className="c">{t.printHead}</p>,
                    <p key="d" className="c">{printout.date}</p>,
                    <hr key="r1" />,
                    ...printout.rows.map((r) => (
                      <p key={r.name} className="row"><span>{r.name}</span><span>{r.cost}</span></p>
                    )),
                    <hr key="r2" />,
                    <p key="tot" className="row big"><span>{t.total}</span><span>{printout.total}</span></p>,
                    <p key="aut" className="row"><span>{t.printAuto}</span><span>{printout.auto}</span></p>,
                    <hr key="r3" />,
                    <p key="idea"><span className="k">{t.printIdea}:</span> {printout.idea}</p>,
                    <p key="to">{fmt(t.sent, { email: printout.email })}</p>,
                    <p key="ty" className="c thx"><b>{t.printThanks}</b></p>,
                    <p key="bc" className="bars" aria-hidden="true" />,
                  ].map((line, i) => (
                    <div key={i} className="ln" style={{ "--i": i } as React.CSSProperties}>{line}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
