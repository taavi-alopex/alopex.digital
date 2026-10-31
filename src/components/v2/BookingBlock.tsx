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
