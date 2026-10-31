"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { MetaEvents } from "@/components/MetaPixel";
import { fmt, type SiteText } from "@/content/v2/text";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Day = { date: string; slots: string[] };

type Text = SiteText["booking"];

const dayLabel = (t: Text, date: string) => {
  const d = new Date(`${date}T12:00:00`);
  return { name: t.days[d.getDay()], date: `${d.getDate()}.${d.getMonth() + 1}` };
};
/** Estonian writes times as 14.00, the others as 14:00. */
const timeOf = (t: Text, slot: string) => (t.slotFormat.includes("kell") ? slot.slice(11, 16).replace(":", ".") : slot.slice(11, 16));
const slotLabel = (t: Text, slot: string) => {
  const { name, date } = dayLabel(t, slot.slice(0, 10));
  return fmt(t.slotFormat, { day: name, date, time: timeOf(t, slot) });
};

/** Local yyyy-mm-dd, so dates match the calendar's own day keys. */
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** "See more times": every free time the calendar allows (up to four weeks), Monday to Friday, in a popup. Picking a time closes it. */
function MoreTimes({ t, slot, onPick }: { t: Text; slot: string | null; onPick: (s: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState<Day[] | null>(null);
  const [day, setDay] = useState<string | null>(null);

  const open = () => {
    ref.current?.showModal();
    if (days) return;
    fetch("/api/booking/slots?range=full")
      .then((r) => r.json())
      .then((d) => {
        const list: Day[] = (d.days || []).filter((x: Day) => x.slots.length);
        setDays(list);
        setDay((cur) => cur ?? list[0]?.date ?? null);
      })
      .catch(() => setDays([]));
  };

  const byDate = new Map((days ?? []).map((d) => [d.date, d.slots]));
  // Weeks from this Monday (next Monday at the weekend), Monday to Friday.
  const monday = new Date();
  monday.setHours(12, 0, 0, 0);
  if (monday.getDay() === 6) monday.setDate(monday.getDate() + 2);
  if (monday.getDay() === 0) monday.setDate(monday.getDate() + 1);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  // As many weeks as Martin's calendar opens (it allows booking 14 days ahead), at least two, at most five.
  const last = days?.length ? new Date(`${days[days.length - 1].date}T12:00:00`) : null;
  const span = last ? Math.floor((last.getTime() - monday.getTime()) / (7 * 864e5)) + 1 : 3;
  const weeks = Array.from({ length: Math.min(5, Math.max(2, span)) }, (_, w) =>
    Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + w * 7 + i);
      return ymd(d);
    }),
  );
  const times = day ? byDate.get(day) ?? [] : [];

  return (
    <>
      <button type="button" className="link bk-more" onClick={open}>{t.moreTimes} →</button>
      <dialog ref={ref} className="v2-modal bk-cal" onClick={(e) => e.target === ref.current && ref.current?.close()}>
        <div className="modal-body">
          <button type="button" className="modal-x" aria-label={t.calClose} onClick={() => ref.current?.close()}>×</button>
          <h2>{t.calTitle}</h2>
          <p>{t.calHint}</p>
          {days === null ? (
            <p className="bk-cal-wait">{t.loading}</p>
          ) : (
            <>
              <div className="bk-cal-grid">
                {[1, 2, 3, 4, 5].map((i) => <span key={i} className="hd">{t.days[i]}</span>)}
                {weeks.flat().map((date) => {
                  const n = byDate.get(date)?.length ?? 0;
                  const l = dayLabel(t, date);
                  return (
                    <button key={date} type="button" disabled={!n} aria-pressed={day === date} onClick={() => setDay(date)}>
                      <b>{l.date}</b>
                      {n > 0 && <i aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              <div className="bk-cal-times">
                {day && <b>{dayLabel(t, day).name} {dayLabel(t, day).date}</b>}
                <div>
                  {times.length ? (
                    times.map((s) => (
                      <button key={s} type="button" aria-pressed={slot === s} onClick={() => { onPick(s); ref.current?.close(); }}>
                        {timeOf(t, s)}
                      </button>
                    ))
                  ) : (
                    <span className="none">{t.calNone}</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

/**
 * Booking in three steps that open one after another:
 * the job → the email (sent right away, so we keep the lead) → a time.
 */
export function BookingForm({ text: t }: { text: Text }) {
  const locale = useLocale();
  const [jobs, setJobs] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [days, setDays] = useState<Day[] | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "booked" | "demo" | "error">("idle");
  const leadSent = useRef("");
  const emailOk = EMAIL_RE.test(email);
  const companyOk = company.trim().length >= 2;
  const step2 = jobs.length > 0;
  const step3 = step2 && emailOk && companyOk;
  const done = state === "booked" || state === "demo";

  useEffect(() => {
    fetch(`/api/booking/slots?locale=${locale}`)
      .then((r) => r.json())
      .then((d) => setDays(d.days || []))
      .catch(() => setDays([]));
  }, [locale]);

  // Keep the lead even if they leave before picking a time: sent once the email is valid, and again when the company is added.
  useEffect(() => {
    const key = `${email}|${company.trim()}`;
    if (!emailOk || leadSent.current === key) return;
    const t = setTimeout(() => {
      leadSent.current = key;
      fetch("/api/booking/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, company: company.trim(), jobs, locale }) }).catch(() => {});
    }, 1500);
    return () => clearTimeout(t);
  }, [email, emailOk, company, jobs, locale]);

  const book = async () => {
    if (!slot || !emailOk || !companyOk) return;
    setState("sending");
    try {
      const res = await fetch("/api/booking/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, company: company.trim(), jobs, slot, locale }) });
      const data = await res.json();
      setState(!res.ok || !data.ok ? "error" : data.live ? "booked" : "demo");
      if (res.ok && data.ok) MetaEvents.schedule({ content_name: "Intro call" });
    } catch {
      setState("error");
    }
  };

  if (done && slot) {
    return (
      <div className="bk-form">
        <div className="bk-done">
          <span className="tick" aria-hidden="true">✓</span>
          <h3>{fmt(t.doneTitle, { slot: slotLabel(t, slot) })}</h3>
          <p>{state === "booked" ? fmt(t.doneLive, { email, jobs: jobs.map((j) => j.toLowerCase()).join(", ") }) : t.doneDemo}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bk-form" aria-label="Book a call">
      <div className="bk-step">
        <span className={`n${step2 ? " ok" : ""}`}>{step2 ? "✓" : "1"}</span>
        <b>{t.step1}</b>
      </div>
      <div className="bk-chips">
        {t.jobs.map((j) => (
          <button key={j} type="button" aria-pressed={jobs.includes(j)} onClick={() => setJobs(jobs.includes(j) ? jobs.filter((x) => x !== j) : [...jobs, j])}>
            {j}
          </button>
        ))}
      </div>

      {!step2 && <p className="bk-hint">{t.hint}</p>}

      {step2 && (
        <div className="bk-reveal">
          <div className="bk-step">
            <span className={`n${emailOk && companyOk ? " ok" : ""}`}>{emailOk && companyOk ? "✓" : "2"}</span>
            <b>{t.step2}</b>
          </div>
          <div className="bk-fields">
            <input type="email" placeholder={t.emailPlaceholder} aria-label={t.emailPlaceholder} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} />
            <input placeholder={t.companyPlaceholder} aria-label={t.companyPlaceholder} autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>
      )}

      {!step2 && <Upcoming n="2" title={t.step2} />}
      {!step3 && <Upcoming n="3" title={t.step3} />}

      {step3 && (
        <div className="bk-reveal">
          <div className="bk-step">
            <span className={`n${slot ? " ok" : ""}`}>{slot ? "✓" : "3"}</span>
            <b>{t.step3}</b>
            <small>{t.slotNote}</small>
          </div>
          <div className="bk-week">
            {days === null && <span className="none">{t.loading}</span>}
            {days?.length === 0 && <span className="none">{t.none}</span>}
            {days?.map((d) => {
              const l = dayLabel(t, d.date);
              return (
                <div className="day" key={d.date}>
                  <small>{l.name}</small>
                  <b>{l.date}</b>
                  {d.slots.map((s) => (
                    <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)}>
                      {timeOf(t, s)}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
          <MoreTimes t={t} slot={slot} onPick={setSlot} />
          <button className="btn" type="button" onClick={book} disabled={!slot || state === "sending"}>
            {state === "sending" ? t.sending : slot ? fmt(t.book, { slot: slotLabel(t, slot) }) : t.pickFirst}
          </button>
          {state === "error" && <span className="bk-note">{t.error}</span>}
        </div>
      )}
    </div>
  );
}

/** A step that opens later, shown dimmed so people see how short the form is. */
function Upcoming({ n, title }: { n: string; title: string }) {
  return (
    <div className="bk-step later" aria-hidden="true">
      <span className="n">{n}</span>
      <b>{title}</b>
    </div>
  );
}
