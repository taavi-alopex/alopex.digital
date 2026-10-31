"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { MetaEvents } from "@/components/MetaPixel";
import type { SiteText } from "@/content/v2/text";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Footer sign-up. Same GoHighLevel webhook and payload as the old newsletter popup. */
export function Newsletter({ text }: { text: SiteText["footer"]["newsletter"] }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setState("error");
    const url = process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK;
    setState("sending");
    try {
      if (url) {
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "", email, source: window.location.pathname, timestamp: new Date().toISOString() }) });
        if (!res.ok) throw new Error(String(res.status));
      }
      MetaEvents.lead({ content_name: "Newsletter Signup" });
      setState("done");
    } catch {
      setState("error");
    }
  };
  if (state === "done") return <p className="nl-done">{text.done}</p>;
  return (
    <form className="nl" onSubmit={submit}>
      <b>{text.title}</b>
      <span>{text.text}</span>
      <div>
        <input type="email" placeholder={text.placeholder} aria-label={text.placeholder} value={email} onChange={(e) => setEmail(e.target.value.trim())} />
        <button className="btn sm" type="submit" disabled={state === "sending"}>{text.button}</button>
      </div>
      {state === "error" && <small>{text.error}</small>}
    </form>
  );
}

/** "Want to build with us?" on About. Same webhook and payload as the old recruitment modal. */
export function JoinForm({ text }: { text: SiteText["about"]["join"] }) {
  const locale = useLocale();
  const [f, setF] = useState({ name: "", email: "", role: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name || !EMAIL_RE.test(f.email)) return setState("error");
    const url = process.env.NEXT_PUBLIC_GHL_RECRUITMENT_WEBHOOK;
    setState("sending");
    try {
      if (url) await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...f, locale, timestamp: new Date().toISOString() }) });
      MetaEvents.lead({ content_name: "Job Application" });
      setState("done");
    } catch {
      setState("error");
    }
  };
  if (state === "done") return <p className="form-done">{text.done}</p>;
  return (
    <form className="join-form" onSubmit={submit}>
      <input placeholder={text.name} aria-label={text.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input type="email" placeholder={text.email} aria-label={text.email} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value.trim() })} />
      <input placeholder={text.role} aria-label={text.role} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })} className="wide" />
      <textarea placeholder={text.message} aria-label={text.message} rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="wide" />
      <div className="wide row">
        <button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? text.sending : text.send}</button>
        {state === "error" && <small>{text.error}</small>}
      </div>
    </form>
  );
}

/** "Join the team" in the footer: opens the same form as on About in a popup, like the old recruitment modal. */
export function JoinTeamLink({ label, closeLabel, text }: { label: string; closeLabel: string; text: SiteText["about"]["join"] }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="linkbtn"
        onClick={() => {
          ref.current?.showModal();
          ref.current?.querySelector("input")?.focus();
        }}
      >
        {label}
      </button>
      <dialog
        ref={ref}
        className="v2-modal"
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="modal-body">
          <button type="button" className="modal-x" aria-label={closeLabel} onClick={() => ref.current?.close()}>
            ×
          </button>
          <h2>{text.title}</h2>
          <p>{text.text}</p>
          <JoinForm text={text} />
        </div>
      </dialog>
    </>
  );
}
