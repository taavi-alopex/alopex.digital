import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { clientDataById } from "@/content/v2/clients";
import { PLATFORM_CASES, type PlatformId } from "@/content/v2/platforms";
import { getPlatform, getText } from "@/content/v2/text";
import { BookLink } from "./BookLink";
import { ClientTile, PageFrame } from "./Shared";

const LOCALES = ["en", "et", "pl"];

/** Metadata for a search page: its own address plus the other two languages. */
export function platformMetadata(id: PlatformId, locale: string): Metadata {
  const { page } = getPlatform(locale, id);
  const url = (l: string) => `https://alopex.digital/${l}/${id}`;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: url(locale), languages: { ...Object.fromEntries(LOCALES.map((l) => [l, url(l)])), "x-default": url("en") } },
  };
}

/** GoHighLevel, n8n and RevOps search pages, in every language: what the tool is, when it fits, what we do with it, real cases. */
export function PlatformLanding({ id, locale }: { id: PlatformId; locale: string }) {
  const { page: p, labels: L } = getPlatform(locale, id);
  const t = getText(locale);
  return (
    <PageFrame>
      <header className="phead">
        <div className="wrap">
          <span className="mono muted">{p.crumb}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.lead}</p>
          <div className="actions" style={{ marginTop: 26 }}>
            <BookLink>{t.ui.book30}</BookLink>
            <Link className="btn ghost" href="/work">{t.ui.seeWork}</Link>
          </div>
        </div>
      </header>

      <div>
        <section className="s">
          <div className="wrap pl-what">
            <div>
              <h2>{p.what.title}</h2>
              <p>{p.what.text}</p>
            </div>
            <div className="pl-fit">
              <div className="card small">
                <b>{L.fits}</b>
                <ul className="ticks one">{p.what.fits.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="card small no">
                <b>{L.notFits}</b>
                <ul className="ticks one">{p.what.notFits.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="s alt">
          <div className="wrap">
            <div className="shead">
              <h2>{p.doTitle}</h2>
            </div>
            <div className="grid3">
              {p.do.map((d) => (
                <div key={d.title} className="card small">
                  <b>{d.title}</b>
                  <span>{d.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s">
          <div className="wrap">
            <div className="shead">
              <h2>{L.cases}</h2>
              <Link className="link" href="/work">{L.allWork} →</Link>
            </div>
            <div className="wall">
              {PLATFORM_CASES[id].map(clientDataById).map((c) => c && <ClientTile key={c.id} c={c} locale={locale} />)}
            </div>
          </div>
        </section>

        <section className="s alt">
          <div className="wrap">
            <div className="shead">
              <h2>{t.home.runs.title}</h2>
              <Link className="link" href="/process">{t.ui.fullProcess}</Link>
            </div>
            <ol className="steps4">
              {t.home.runs.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="mono muted">0{i + 1} · {s.when}</span>
                  <b>{s.title}</b>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="wrap faq-wrap">
            <h2 className="minor">{L.faq}</h2>
            <div className="faq">
              {p.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageFrame>
  );
}
