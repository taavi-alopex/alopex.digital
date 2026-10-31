"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteText } from "@/content/v2/text";

type Text = SiteText["picture"];

/** The hero picture: one Monday at a (mock) company, by hand and with Alopex. Drag the handle to compare. */
export function BeforeAfter({ t }: { t: Text }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const touched = useRef(false);
  const dragging = useRef(false);

  // One slow sweep after load, so people see that it moves. Stops as soon as they touch it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const keys: [number, number][] = [[0, 50], [900, 24], [2000, 74], [2900, 50]];
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (touched.current) return;
      if (t0 === null) t0 = ts;
      const el = ts - t0;
      for (let i = 1; i < keys.length; i++) {
        if (el <= keys[i][0]) {
          const [ta, va] = keys[i - 1];
          const [tb, vb] = keys[i];
          let f = (el - ta) / (tb - ta);
          f = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
          setX(va + (vb - va) * f);
          raf = requestAnimationFrame(step);
          return;
        }
      }
      setX(50);
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(step)), 1100);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (r) setX(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  const n = t.sheetNotes;
  return (
    <figure className="ba">
      <div
        ref={frameRef}
        className="ba-frame"
        data-after={t.withAlopex}
        style={{ ["--x" as string]: `${x.toFixed(2)}%` }}
        onPointerDown={(e) => {
          touched.current = true;
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="ba-layer before" aria-hidden="true">
          <div className="ba-bar">
            <span className="dots"><i /><i /><i /></span>
            <b>{t.company}</b>
            <span className="clock">{t.stillAtWork} <b>17:40</b></span>
          </div>
          <div className="ba-grid">
            <div className="pn">
              <h4>{t.inbox} <em className="bad">{t.unread}</em></h4>
              <ul className="mail">
                {t.mailBefore.map(([from, line]) => (
                  <li key={from + line}><b>{from}</b><span>{line}</span></li>
                ))}
              </ul>
            </div>
            <div className="pn sheetp">
              <h4>orders_FINAL_v3.xlsx <em className="bad">{t.copying}</em></h4>
              <div className="xl">
                {t.sheetHead.map((h) => <span key={h} className="h">{h}</span>)}
                <span>Kask Saunad</span><span>#4467</span><span>1 240</span><span className="y">{n.unknown}</span>
                <span>Doe Events</span><span className="sel">#4471</span><span className="y" /><span className="y" />
                <span>Nordic Feed</span><span>—</span><span className="e">#REF!</span><span />
                <span>Jane Doe Café</span><span>#4459</span><span>860</span><span className="y">{n.sent}</span>
                <span>Roe Bakery</span><span>#4462</span><span>2 015</span><span>0409</span>
                <span>Doe Events</span><span>#4471</span><span>4 280</span><span className="e">{n.dup}</span>
                <span className="y">{n.call}</span><span /><span /><span />
              </div>
            </div>
            <div className="pn notep">
              <h4>{t.todo}</h4>
              <div className="stickies">
                {t.stickies.map((s) => <span key={s}>{s}</span>)}
              </div>
            </div>
          </div>
          <div className="ba-foot"><span>{t.busywork}</span><b>{t.hoursBefore}</b><div className="meter"><i style={{ width: "88%" }} /></div></div>
        </div>

        <div className="ba-layer after" aria-hidden="true">
          <div className="ba-bar">
            <span className="dots"><i /><i /><i /></span>
            <b>{t.company}</b>
            <span className="clock">{t.doneBefore} <b>09:20</b></span>
          </div>
          <div className="ba-grid">
            <div className="pn">
              <h4>{t.inbox} <em className="ok">{t.toSort}</em></h4>
              <ul className="mail sorted">
                {t.mailAfter.map(([from, line], i) => (
                  <li key={from + line} className={i === 4 ? "w" : undefined}><b>{from}</b><span>{line}</span></li>
                ))}
              </ul>
            </div>
            <div className="pn sheetp">
              <h4>{t.pipeline} <em className="ok">{t.synced}</em></h4>
              <div className="board">
                <div><small>{t.board.new}</small><span>Nordic Feed Oy</span><span>Roe Bakery</span></div>
                <div><small>{t.board.quoted}</small><span>Kask Saunad</span><span>Jane Doe Café</span></div>
                <div><small>{t.board.won}</small><span className="w">Doe Events · €4,280</span><span className="w">Kask · €1,240</span></div>
              </div>
            </div>
            <div className="pn notep">
              <h4>{t.doneForYou} <em className="ok">{t.thisMorning}</em></h4>
              <ul className="done">
                {t.done.map((d) => <li key={d}>{d}</li>)}
                <li className="wait">{t.waiting}</li>
              </ul>
            </div>
          </div>
          <div className="ba-foot"><span>{t.busywork}</span><div className="meter"><i style={{ width: "14%" }} /></div><b>{t.hoursAfter}</b></div>
        </div>

        <div
          className="ba-handle"
          data-before={t.byHand}
          role="slider"
          tabIndex={0}
          aria-label={t.slider}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(x)}
          onKeyDown={(e) => {
            const k = e.key;
            if (k === "ArrowLeft" || k === "ArrowRight" || k === "Home" || k === "End") {
              e.preventDefault();
              touched.current = true;
              setX((v) => (k === "Home" ? 0 : k === "End" ? 100 : Math.max(0, Math.min(100, v + (k === "ArrowLeft" ? -5 : 5)))));
            }
          }}
        >
          <span aria-hidden="true">‹ ›</span>
        </div>
      </div>
      <figcaption>
        <span>{t.drag}</span>
        <span>{t.mock}</span>
      </figcaption>
    </figure>
  );
}
