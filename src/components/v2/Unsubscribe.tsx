"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import type { SiteText } from "@/content/v2/text";

/** Newsletter unsubscribe. Same webhook and payload as before: ?id=<contactId>&email=<email>. */
export function UnsubscribeBox({ text: t }: { text: SiteText["unsubscribe"] }) {
  const params = useSearchParams();
  const contactId = params.get("id");
  const email = params.get("email");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const go = async () => {
    const url = process.env.NEXT_PUBLIC_UNSUBSCRIBE_WEBHOOK;
    if (!contactId || !url) return setState("error");
    setState("sending");
    try {
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contactId, email, action: "unsubscribe", timestamp: new Date().toISOString() }) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="card center-box">
        <h1>{t.doneTitle}</h1>
        <p>{t.doneText}</p>
        <Link className="btn ghost" href="/">{t.home}</Link>
      </div>
    );
  }
  return (
    <div className="card center-box">
      <h1>{t.title}</h1>
      {contactId ? (
        <>
          <p>{t.message}</p>
          {email && <p className="mono">{email}</p>}
          <div className="actions">
            <button className="btn" type="button" onClick={go} disabled={state === "sending"}>{t.button}</button>
            <Link className="btn ghost" href="/">{t.cancel}</Link>
          </div>
          {state === "error" && <p className="err">{t.error}</p>}
        </>
      ) : (
        <p>{t.missing}</p>
      )}
    </div>
  );
}
