import { Link } from "@/i18n/navigation";
import { CLIENT_DATA, clientDataById } from "@/content/v2/clients";
import { LOGOS, LOGO_ROW, RECENT, WHAT_WE_DO } from "@/content/v2/home";
import { fmt, getClientText, type SiteText } from "@/content/v2/text";
import { Art } from "./Art";
import { BeforeAfter } from "./BeforeAfter";
import { BookLink } from "./BookLink";
import { ClientTile, Logo } from "./Shared";

type P = { t: SiteText; locale: string };

export function Hero({ t }: P) {
  const h = t.home;
  return (
    <header className="hero">
      <div className="wrap">
        <p className="kicker">{h.kicker}</p>
        <h1>
          {h.h1a}{" "}
          <span className="hl">
            {h.h1b}
            <svg viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 20 C 90 6, 200 26, 396 10" />
            </svg>
          </span>
        </h1>
        <div className="hero-row">
          <p className="sub">{h.sub}</p>
          <div className="actions">
            <BookLink>{t.ui.book30}</BookLink>
            <Link className="btn ghost" href="/work">{t.ui.seeWork}</Link>
          </div>
        </div>
        <BeforeAfter t={t.picture} />
      </div>
    </header>
  );
}

export function ClientStrip({ t, locale }: P) {
  return (
    <div className="clients">
      <div className="wrap">
        <span className="mono muted">{t.ui.ourSystemsRun}</span>
        <ul>
          {LOGO_ROW.map((id) => (
            <li key={id}>
              {clientDataById(id) ? (
                <Link href={`/work/${id}`} title={getClientText(locale, id).name}>
                  <Logo id={id} />
                </Link>
              ) : LOGOS[id]?.href ? (
                <a href={LOGOS[id].href} target="_blank" rel="noopener noreferrer" title={LOGOS[id].name}>
                  <Logo id={id} />
                </a>
              ) : (
                <Logo id={id} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WhatWeDo({ t }: P) {
  const w = t.home.what;
  return (
    <section className="s">
      <div className="wrap">
        <div className="shead">
          <h2>{w.title}</h2>
          <p className="lines">{w.sub}</p>
        </div>
        <div className="figs">
          {w.cards.map((c, i) => (
            <Link key={c.title} className={`fig${WHAT_WE_DO[i].main ? " main" : ""}`} href={WHAT_WE_DO[i].href}>
              <Art name={WHAT_WE_DO[i].art} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="go">{c.link} →</span>
            </Link>
          ))}
        </div>
        <Link className="checkbar card" href="/health-check">
          <span className="ico">
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" stroke="#161929" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 22V12M10 22V6M16 22v-8M22 22V3" />
            </svg>
          </span>
          <span>
            <b>{t.home.check.bold}</b> {t.home.check.text}
          </span>
          <span className="go">{t.home.check.go}</span>
        </Link>
      </div>
    </section>
  );
}

export function JobsBand({ t }: P) {
  const j = t.home.jobs;
  return (
    <section className="jobs">
      <div className="wrap">
        <h2>{j.title}</h2>
        <p className="sub">{j.sub}</p>
      </div>
      <div className="rails">
        {j.rails.map((rail, i) => (
          <div key={i} className={`rail${i ? " r2" : ""}`} aria-hidden={i > 0 || undefined}>
            {[...rail, ...rail].map(([job, who], k) => (
              <span key={k}>
                {job} <small>{who}</small>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function RecentWork({ t, locale }: P) {
  const [a, b] = RECENT.map(clientDataById);
  return (
    <section className="s" id="work">
      <div className="wrap">
        <div className="shead">
          <h2>{t.home.recent.title}</h2>
          <Link className="link" href="/work">{fmt(t.ui.allClients, { n: CLIENT_DATA.length })}</Link>
        </div>
        <div className="wall">
          {a && <ClientTile c={a} locale={locale} big />}
          {b && <ClientTile c={b} locale={locale} />}
        </div>
      </div>
    </section>
  );
}

export function HowItRuns({ t }: P) {
  const r = t.home.runs;
  return (
    <section className="s alt">
      <div className="wrap">
        <div className="shead">
          <h2>{r.title}</h2>
          <Link className="link" href="/process">{t.ui.fullProcess}</Link>
        </div>
        <ol className="steps4">
          {r.steps.map((s, i) => (
            <li key={s.title}>
              <span className="mono muted">0{i + 1} · {s.when}</span>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Quotes({ t }: P) {
  const q = t.home.quotes;
  return (
    <section className="s">
      <div className="wrap">
        <div className="shead">
          <h2>{q.title}</h2>
        </div>
        <div className="quotes">
          {q.items.map((x) => (
            <figure key={x.name} className="card quote">
              <blockquote>{x.quote}</blockquote>
              <figcaption>
                <b>{x.name}</b>
                <span>{x.role}</span>
                {x.client && !LOGOS[x.client]?.href && clientDataById(x.client) && <Link className="link" href={`/work/${x.client}`}>{t.ui.readMore}</Link>}
                {x.client && LOGOS[x.client]?.href && (
                  <a className="link" href={LOGOS[x.client].href} target="_blank" rel="noopener noreferrer">
                    {LOGOS[x.client].href!.replace(/^https:\/\/(www\.)?|\/$/g, "")} ↗
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Shipped({ t }: P) {
  const s = t.home.shipped;
  return (
    <section className="s alt">
      <div className="wrap">
        <div className="shead">
          <h2>{s.title}</h2>
          <p>{s.sub}</p>
        </div>
        <ol className="log">
          {s.items.map((x) => (
            <li key={x.title}>
              <time>{x.date}</time>
              <div>
                <b>{x.title}</b>
                <span>{x.text}</span>
              </div>
              <Link className="who" href={x.client ? `/work/${x.client}` : "/products"}>{x.who}</Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
