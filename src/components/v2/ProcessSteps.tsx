"use client";

import { useEffect, useRef, useState } from "react";

type Step = { title: string; when: string; text: string; give: string[]; get: string[] };
type Props = { steps: Step[]; hint: string; stepLabel: string; give: string; get: string };

/** How we work: step cards on the right, a sticky list on the left that follows the scroll. */
export function ProcessSteps({ steps, hint, stepLabel, give, get }: Props) {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const cards = useRef<(HTMLLIElement | null)[]>([]);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let a = 0;
      cards.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < mid) a = i;
      });
      setActive(a);
      const first = items.current[0];
      const cur = items.current[a];
      if (first && cur) setFill(cur.offsetTop - first.offsetTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (i: number) => {
    const el = cards.current[i];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  };

  return (
    <div className="proc">
      <aside className="pnav card">
        <span className="mono muted">{hint}</span>
        <ol>
          <span className="fill" style={{ height: fill }} aria-hidden="true" />
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                items.current[i] = el;
              }}
              className={i === active ? "on" : i < active ? "done" : undefined}
            >
              <button type="button" onClick={() => go(i)}>
                <i>{i + 1}</i>
                <span>
                  <b>{s.title}</b>
                  <small>{s.when.split(" · ")[0]}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </aside>
      <ol className="psteps">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className={`card${i === active ? " on" : ""}`}
          >
            <span className="mono muted">
              {stepLabel} {i + 1}
            </span>
            <h2>{s.title}</h2>
            <span className="when">{s.when}</span>
            <p>{s.text}</p>
            <div className="io">
              <div>
                <b>{give}</b>
                <ul className="ticks one">{s.give.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <b>{get}</b>
                <ul className="ticks one">{s.get.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
